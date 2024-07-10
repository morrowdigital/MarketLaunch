// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { use } from 'next-api-route-middleware';
import { allowMethods, captureErrors, changeKeyCase, validateBody } from '~/api-helpers/middleware';
import Joi from 'joi';
import { handler } from '~/api-helpers/account-handler';
import { VendorCreateSwellResponse } from '~/types/swell.types';

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  content: Joi.object({
    contactEmail: Joi.string().required(),
    businessName: Joi.string(),
    vendorLogo: Joi.string(),
  }).required(),
});

export default use(
  captureErrors(),
  allowMethods(['POST']),
  validateBody(schema),
  changeKeyCase(),
  handler<VendorCreateSwellResponse>('vendors')
);
