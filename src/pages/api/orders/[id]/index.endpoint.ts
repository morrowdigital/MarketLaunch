// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
  validateOrderOwnership,
  validateQuery,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, FetchOrderDetailResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { getOrder } from '~/api-helpers/order';

const schema = Joi.object({
  id: Joi.string().required(),
});

export default use(
  validateAccount(),
  validateOrderOwnership({ path: 'query.id' }),
  captureErrors(),
  allowMethods(['GET']),
  validateQuery(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<FetchOrderDetailResponse>>
  ) {
    const orderId = req.query.id as string;

    const response = await getOrder({ orderId });
    if (checkAndHandleErrors<FetchOrderDetailResponse>(response, res)) {
      return;
    }

    if (response) {
      res.status(200).send({ success: true, data: response });
    }
  }
);
