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
import { ApiResponse } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import { accountExists } from '~/api-helpers/account-handler';

const schema = Joi.object({
  email: Joi.string().required(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET']),
  validateQuery(schema),
  changeKeyCase(),
  async function (req: NextApiRequest, res: NextApiResponse<ApiResponse<boolean>>) {
    const email = req.query.email as string;

    const response = await accountExists({ email });
    if (checkAndHandleErrors<boolean>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response });
  }
);
