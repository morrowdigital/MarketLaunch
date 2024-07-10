// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
  validateProductOwnership,
  validateQuery,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  DeleteProductSwellResponse,
  FetchProductSwellResponse,
  UpdateProductSwellResponse,
} from '~/types/swell.types';
import { ApiResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { deleteProduct, getProduct, updateProduct } from '~/api-helpers/product';

const querySchema = Joi.object({
  id: Joi.string().required(),
});

export default use(
  validateAccount(),
  validateProductOwnership({ path: 'query.id', methods: ['DELETE', 'PUT'] }),
  captureErrors(),
  allowMethods(['DELETE', 'GET', 'PUT']),
  validateQuery(querySchema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<
      ApiResponse<
        DeleteProductSwellResponse | FetchProductSwellResponse | UpdateProductSwellResponse
      >
    >
  ) {
    const id = req.query.id as string;

    let response;
    if (req.method === 'DELETE') {
      response = await deleteProduct({ productId: id });
      if (checkAndHandleErrors<DeleteProductSwellResponse>(response, res)) {
        return;
      }
    } else if (req.method === 'GET') {
      response = await getProduct({ productId: id });
      if (checkAndHandleErrors<FetchProductSwellResponse>(response, res)) {
        return;
      }
    } else if (req.method === 'PUT') {
      response = await updateProduct({ productId: id, input: req.body });
      if (checkAndHandleErrors<UpdateProductSwellResponse>(response, res)) {
        return;
      }
    }

    if (response) {
      res.status(200).send({ success: true, data: response });
    }
  }
);
