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
import { RefundPaymentSwellResponse } from '~/types/swell.types';
import { ApiResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { refundPayment } from '~/api-helpers/order';
import { makeSnakeCaseKeys } from '~/utils/case';

const schema = Joi.object({
  method: Joi.string().required(),
  amount: Joi.number().required(),
  parentId: Joi.string().required(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['POST']),
  validateQuery(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<RefundPaymentSwellResponse>>
  ) {
    const body = makeSnakeCaseKeys(req.body);

    const response = await refundPayment(body);
    if (checkAndHandleErrors<RefundPaymentSwellResponse>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response });
  }
);
