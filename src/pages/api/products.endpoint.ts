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
import { CreateProductSwellResponse, FetchProductsSwellResponse } from '~/types/swell.types';
import { ApiResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { createProduct, getProducts } from '~/api-helpers/product';

const schema = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().optional(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET', 'POST']),
  validateQuery(schema, ['GET']),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<FetchProductsSwellResponse | CreateProductSwellResponse>>
  ) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const accountId = req.headers['x-account-id'] as string;

    let response;

    if (req.method === 'GET') {
      response = await getProducts({ page, limit, accountId });
      if (checkAndHandleErrors<FetchProductsSwellResponse>(response, res)) {
        return;
      }

      res.status(200).send({ success: true, data: response });
      return;
    } else if (req.method === 'POST') {
      const input = { ...req.body, vendor_id: accountId };

      response = await createProduct(input);
      if (checkAndHandleErrors<CreateProductSwellResponse>(response, res)) {
        return;
      }

      res.status(200).send({ success: true, data: response });
      return;
    }
  }
);
