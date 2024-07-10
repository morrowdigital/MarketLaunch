// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
  validateBody,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateAccountSwellResponse } from '~/types/swell.types';
import { ApiResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { updateAccount } from '~/api-helpers/account-handler';

const schema = Joi.object({
  content: Joi.object({
    contactName: Joi.string().optional(),
    contactEmail: Joi.string().optional(),
    contactPhone: Joi.string().optional(),
    businessName: Joi.string().optional(),
    vendorLogo: Joi.string().optional(),
  }),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['PUT']),
  validateBody(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<UpdateAccountSwellResponse>>
  ) {
    const accountId = req.headers['x-account-id'] as string;

    let response;
    if (req.method === 'PUT') {
      response = await updateAccount({ data: req.body, accountId });
      if (checkAndHandleErrors<UpdateAccountSwellResponse>(response, res)) {
        return;
      }
    }

    if (response) {
      res.status(200).send({ success: true, data: response });
    }
  }
);
