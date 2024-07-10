// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
  validateQuery,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, FetchStripeAccountResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { getStripeClient } from '~/api-helpers/stripe-client';

const schema = Joi.object({
  id: Joi.string().required(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET']),
  validateQuery(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<FetchStripeAccountResponse>>
  ) {
    const stripe = getStripeClient();
    const id = req.query.id as string;
    const account = await stripe.accounts.retrieve(id);
    if (checkAndHandleErrors<FetchStripeAccountResponse>(account, res)) {
      return;
    }

    const data = {
      ...account,
      detailsSubmitted: account.details_submitted,
    };

    res.status(200).send({ success: true, data });
  }
);
