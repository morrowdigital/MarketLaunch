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
import { FetchOrdersSwellResponse } from '~/types/swell.types';
import { ApiResponse } from '~/types/api.types';
import { getSwellClient } from '~/api-helpers/swell-node';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import { appConfig } from '~/app-config/app-config';
import Joi from 'joi';

const schema = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().optional(),
  vendor: Joi.boolean().optional(),
  paid: Joi.boolean().optional(),
  status: Joi.string().optional(),
  refunded: Joi.boolean().optional(),
  search: Joi.string().optional(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET']),
  validateQuery(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<FetchOrdersSwellResponse>>
  ) {
    const client = getSwellClient();

    const filters = {
      paid: req.query.paid,
      status: req.query.status,
      refunded: req.query.refunded,
    };
    const page = req.query.page;
    const limit = req.query.limit;
    const vendor = Boolean(req.query.vendor);

    const accountId = req.headers['x-account-id'];

    const accountFilter = vendor
      ? {
          vendor_id: accountId,
        }
      : {
          account_id: accountId,
        };

    let response: FetchOrdersSwellResponse;
    try {
      response = await client.get('/orders', {
        expand: ['account', 'shipments'],
        limit: limit || appConfig.ordersPaginationLimit,
        page,
        search: req.query.search,
        where: {
          ...accountFilter,
          ...filters,
        },
      });
    } finally {
      client.close();
    }

    if (checkAndHandleErrors<FetchOrdersSwellResponse>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response });
  }
);
