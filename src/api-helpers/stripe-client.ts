import Stripe from 'stripe';
import { appConfig } from '~/app-config/app-config';
export const getStripeClient = () =>
  new Stripe(appConfig.STRIPE_API_KEY, {
    apiVersion: appConfig.STRIPE_API_VERSION,
  });
