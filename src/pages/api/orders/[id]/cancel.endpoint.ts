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
import { CancelOrderResponse, UpdateOrderSwellResponse } from '~/types/swell.types';
import { ApiResponse, ErrorCodes } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { getOrder, refundPayment, updateOrder } from '~/api-helpers/order';
import { getErrorResponse } from '~/api-helpers/errors';

const schema = Joi.object({
  id: Joi.string().required(),
});

export default use(
  validateAccount(),
  validateOrderOwnership({ path: 'query.id' }),
  captureErrors(),
  allowMethods(['PUT']),
  validateQuery(schema),
  changeKeyCase(),
  async function (req: NextApiRequest, res: NextApiResponse<ApiResponse<CancelOrderResponse>>) {
    const orderId = req.query.id as string;
    const order = await getOrder({ orderId });
    if (checkAndHandleErrors<UpdateOrderSwellResponse>(order, res)) {
      return;
    }

    if (order.delivered) {
      res
        .status(400)
        .send(
          getErrorResponse(ErrorCodes.SWELL_ERROR)('Order already fulfilled', [
            'Order already fulfilled',
          ])
        );
      return;
    }

    const response = await updateOrder({ orderId, order: { canceled: true } });
    if (checkAndHandleErrors<UpdateOrderSwellResponse>(response, res)) {
      return;
    }

    if (response && response.canceled) {
      // Send refund
      const payment = order.payments.results.find(
        (item) => String(item.amount) === String(order.paymentTotal)
      );

      if (payment) {
        await refundPayment({
          parentId: payment.id!,
          method: payment.method,
          amount: payment.amountRefundable!,
        });
      }
    }

    res.status(200).send({ success: true, data: response });
  }
);
