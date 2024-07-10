import { Middleware } from 'next-api-route-middleware';
import Joi from 'joi';
import { makeCamelCaseKeys, makeSnakeCaseKeys } from '~/utils/case';
import { getErrorResponse } from '~/api-helpers/errors';
import { ErrorCodes } from '~/types/api.types';
import { getAccountFromCookie } from '~/api-helpers/account-cookie';
import { appConfig } from '~/app-config/app-config';
import { parse } from 'cookie';
import { getOrder } from './order';
import getObjectValueFromKeyPath from 'lodash.get';
import { getProduct } from './product';

export const allowMethods = (allowedMethods: string[]): Middleware => {
  return async function (req, res, next) {
    if (allowedMethods.includes(req.method!) || req.method == 'OPTIONS') {
      await next();
    } else {
      res.status(405).send(getErrorResponse(ErrorCodes.METHOD_NOT_ALLOWED)(req.method!));
    }
  };
};

export const validateBody = (schema: ReturnType<(typeof Joi)['object']>): Middleware => {
  return async function (req, res, next) {
    if (!req.body) {
      res.status(400).send(getErrorResponse(ErrorCodes.INVALID_DATA)('Body is required'));
    }
    const result = schema.validate(req.body);

    if (schema.validate(req.body).error) {
      res.status(400).send(getErrorResponse(ErrorCodes.INVALID_DATA)(result.error!.message));
    }

    await next();
  };
};

export const validateQuery = (
  schema: ReturnType<(typeof Joi)['object']>,
  methods: string[] = ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
): Middleware => {
  return async function (req, res, next) {
    if (!methods.includes(req.method!)) {
      await next();
      return;
    }

    if (!req.query) {
      res
        .status(400)
        .send(getErrorResponse(ErrorCodes.INVALID_DATA)('query parameters are required'));
    }
    const result = schema.validate(req.query);

    if (schema.validate(req.query).error) {
      res.status(400).send(getErrorResponse(ErrorCodes.INVALID_DATA)(result.error!.message));
    }

    await next();
  };
};

export const changeKeyCase = (): Middleware => {
  return async function (req, res, next) {
    req.body = makeSnakeCaseKeys(req.body);
    const originalSend = res.send;

    res.send = (data) => {
      originalSend.call(res, makeCamelCaseKeys(data));
    };
    await next();
  };
};

export const captureErrors = (): Middleware => {
  return async function (req, res, next) {
    try {
      await next();
    } catch (error) {
      console.log(error);
      res.status(500).send(getErrorResponse(ErrorCodes.INTERNAL_SERVER_ERROR)());
    }
  };
};

export const validateAccount = (): Middleware => {
  return async function (req, res, next) {
    const cookieList = parse(req.headers.cookie ?? '');
    const result = await getAccountFromCookie({
      gqlEndpoint: appConfig.NEXT_PUBLIC_SWELL_GQL_ENDPOINT,
      publicKey: appConfig.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
      sessionCookie: cookieList['swell-session'],
    });

    if (result.error && result.error === 'NO_SESSION') {
      return res.status(400).send(getErrorResponse(ErrorCodes.SWELL_ERROR)());
    } else if (result.error && result.error === 'UNAUTHORIZED') {
      return res.status(401).send(getErrorResponse(ErrorCodes.SWELL_ERROR)());
    }

    const accountId = result.data.session.accountId;
    req.headers['x-account-id'] = accountId;
    req.headers['x-account-group'] = cookieList['account-group'];

    await next();
  };
};

export const validateOrderOwnership = ({ path }: { path: string }): Middleware => {
  return async function (req, res, next) {
    const accountId = req.headers['x-account-id'] as string;
    const orderId = getObjectValueFromKeyPath(req, path);
    const order = await getOrder({ orderId });

    if (!order) {
      return res.status(400).send(getErrorResponse(ErrorCodes.INVALID_DATA)('Order not found'));
    } else if (order.account_id !== accountId && order.vendor_id !== accountId) {
      return res.status(401).send(getErrorResponse(ErrorCodes.INVALID_DATA)('Unauthorized'));
    }

    await next();
  };
};

export const validateProductOwnership = ({
  path,
  methods,
}: {
  path: string;
  methods: string[];
}): Middleware => {
  return async function (req, res, next) {
    if (!methods.includes(req.method!)) {
      await next();
      return;
    }

    const accountId = req.headers['x-account-id'] as string;
    const productId = getObjectValueFromKeyPath(req, path);

    const product = await getProduct({ productId });

    if (!product) {
      return res.status(400).send(getErrorResponse(ErrorCodes.INVALID_DATA)('Product not found'));
    } else if (product.vendor_id !== accountId) {
      return res.status(401).send(getErrorResponse(ErrorCodes.INVALID_DATA)('Unauthorized'));
    }

    await next();
  };
};
