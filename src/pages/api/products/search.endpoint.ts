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
import { FetchProductsSwellResponse } from '~/types/swell.types';
import { ApiResponse } from '~/types/api.types';
import { getSwellClient } from '~/api-helpers/swell-node';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { appConfig } from '~/app-config/app-config';

const schema = Joi.object({
  page: Joi.number().required(),
  query: Joi.string().optional(),
  limit: Joi.number().optional(),
  statuses: Joi.string().optional(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET']),
  validateQuery(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<FetchProductsSwellResponse>>
  ) {
    const client = getSwellClient();

    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const query = req.query.query as string | undefined;
    const statusesStr = req.query.statuses as string | undefined;

    const accountId = req.headers['x-account-id'];
    const queryParam = query ? `?search=${query}` : ``;

    const searchQuery = new Map();
    searchQuery.set('vendor_id', accountId);
    if (statusesStr) {
      const statuses = statusesStr.split(',');
      searchQuery.set('stock_status', { $in: statuses });
    }

    let response: FetchProductsSwellResponse;
    try {
      response = await client.get(`/products${queryParam}`, {
        page,
        limit: limit || appConfig.productsPaginationLimit,
        where: Object.fromEntries(searchQuery.entries()),
      });
    } finally {
      client.close();
    }

    if (checkAndHandleErrors<FetchProductsSwellResponse>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response });
  }
);
