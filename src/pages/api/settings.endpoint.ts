// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import {
  allowMethods,
  captureErrors,
  changeKeyCase,
  validateAccount,
} from '~/api-helpers/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, FetchSettingsResponse } from '~/types/api.types';
import { getSwellClient } from '~/api-helpers/swell-node';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['GET']),
  changeKeyCase(),
  async function (req: NextApiRequest, res: NextApiResponse<ApiResponse<FetchSettingsResponse>>) {
    const client = getSwellClient();

    let response: FetchSettingsResponse;

    try {
      response = await client.get(`/settings`);
    } finally {
      client.close();
    }

    if (checkAndHandleErrors<FetchSettingsResponse>(response, res)) {
      return;
    }

    res.status(200).send({ success: true, data: response });
  }
);
