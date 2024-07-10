import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
  validateQuery,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, ListStripePayoutsResponse, StripeStatus } from '~/types/api.types';
import Joi from 'joi';
import { getStripePayouts } from '~/api-helpers/stripe';

const schema = Joi.object({
  stripeConnectId: Joi.string().required(),
  filteredStatuses: Joi.string().optional(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET']),
  validateQuery(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<ListStripePayoutsResponse>>
  ) {
    const stripeConnectId = req.query.stripeConnectId as string;

    const filteredStatusesJoined = req.query.filteredStatuses as string | undefined;
    const filteredStatuses = filteredStatusesJoined ? filteredStatusesJoined.split(',') : [];

    const payoutsResponse = await getStripePayouts(
      stripeConnectId,
      filteredStatuses as StripeStatus[]
    );

    // Cannot use checkAndHandleErrors as this only checks for swell errors!
    res.send({ success: true, data: payoutsResponse });
  }
);
