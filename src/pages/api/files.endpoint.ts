// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import { allowMethods, captureErrors, validateBody } from '~/api-helpers/middleware';
import Joi from 'joi';
import { FileCreateSwellResponse } from '~/types/swell.types';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, FileUploadData } from '~/types/api.types';
import { getSwellClient } from '~/api-helpers/swell-node';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';

const schema = Joi.object({
  contentType: Joi.string().required(),
  base64Data: Joi.string().required(),
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<FileCreateSwellResponse>>
) {
  const client = getSwellClient();
  const body = req.body as FileUploadData;

  let response: FileCreateSwellResponse;
  try {
    response = await client.post('/:files', {
      content_type: body.contentType,
      data: {
        $binary: body.base64Data,
      },
    });
  } finally {
    client.close();
  }

  if (checkAndHandleErrors(response, res)) {
    return;
  }

  res.status(200).send({ success: true, data: response });
}

export default use(captureErrors(), allowMethods(['POST']), validateBody(schema), handler);
