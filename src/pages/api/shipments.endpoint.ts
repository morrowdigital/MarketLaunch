// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
  validateBody,
  validateOrderOwnership,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '~/types/api.types';
import { getSwellClient } from '~/api-helpers/swell-node';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { ShipmentCreateResponse } from '~/types/swell.types';

const schema = Joi.object({
  orderId: Joi.string().required(),
  trackingCode: Joi.string().allow(''),
  notes: Joi.string().allow(''),
  serviceName: Joi.string(),
  service: Joi.string(),
  carrier: Joi.string().allow(null),
  destination: Joi.object(),
  items: Joi.array().items(
    Joi.object({
      orderItemId: Joi.string().required(),
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    })
  ),
});

export default use(
  validateAccount(),
  validateOrderOwnership({ path: 'body.orderId' }),
  captureErrors(),
  allowMethods(['POST']),
  validateBody(schema),
  changeKeyCase(),
  async function (req: NextApiRequest, res: NextApiResponse<ApiResponse<ShipmentCreateResponse>>) {
    const client = getSwellClient();

    const input = { ...req.body, $notify: 'orders.shipped' };

    let response: ShipmentCreateResponse;

    try {
      response = await client.post(`/shipments`, input);
    } finally {
      client.close();
    }

    if (checkAndHandleErrors<ShipmentCreateResponse>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response });
  }
);
