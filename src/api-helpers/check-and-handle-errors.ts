import { NextApiResponse } from 'next';
import { ApiResponse, ErrorCodes } from '~/types/api.types';
import { SwellErrorResponse } from '~/types/swell.types';
import { getErrorResponse } from '~/api-helpers/errors';

export function checkAndHandleErrors<T>(
  responseParam: any,
  res: NextApiResponse<ApiResponse<T>>
): boolean {
  const response = responseParam as SwellErrorResponse | undefined;
  if (response?.errors) {
    const firstError = Object.values(response.errors)[0];

    res
      .status(400)
      .send(getErrorResponse(ErrorCodes.SWELL_ERROR)(firstError?.message ?? '', response.errors));
    return true;
  }

  return false;
}
