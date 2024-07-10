import { ApiErrorResponse, ErrorCodes } from '~/types/api.types';

const getErrorObjectMethodNotAllowed = (method: string): ApiErrorResponse => ({
  success: false,
  source: 'api',
  code: ErrorCodes.METHOD_NOT_ALLOWED,
  message: `Method ${method} not allowed`,
});

const getErrorObjectInvalidData = (message: string): ApiErrorResponse => ({
  success: false,
  source: 'api',
  code: ErrorCodes.INVALID_DATA,
  message: `Invalid request: ${message}`,
});

const getErrorObjectInternalServerError = (): ApiErrorResponse => ({
  success: false,
  source: 'api',
  code: ErrorCodes.INTERNAL_SERVER_ERROR,
  message: 'Internal Server Error',
});

function getErrorObjectSwellError<E>(message: string, details: E) {
  return {
    success: false,
    source: 'swell',
    code: ErrorCodes.SWELL_ERROR,
    details,
  } as ApiErrorResponse<E>;
}

const errorGeneratorsMap: Record<ErrorCodes, (...params: any) => ApiErrorResponse> = {
  [ErrorCodes.METHOD_NOT_ALLOWED]: getErrorObjectMethodNotAllowed,
  [ErrorCodes.INVALID_DATA]: getErrorObjectInvalidData,
  [ErrorCodes.INTERNAL_SERVER_ERROR]: getErrorObjectInternalServerError,
  [ErrorCodes.SWELL_ERROR]: getErrorObjectSwellError,
};

export const getErrorResponse = (code: ErrorCodes) => errorGeneratorsMap[code];
