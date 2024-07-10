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
import { ApiResponse, CreateStripeAccountLinkResponse, ErrorCodes } from '~/types/api.types';
import { checkAndHandleErrors } from '~/api-helpers/check-and-handle-errors';
import Joi from 'joi';
import Stripe from 'stripe';
import { createStripeAccount, createStripeAccountLink } from '~/api-helpers/stripe';
import { getErrorResponse } from '~/api-helpers/errors';
import { updateAccount } from '~/api-helpers/account-handler';
import { getRequestHost } from '~/api-helpers/get-request-host';

const schema = Joi.object({
  stripeConnectId: Joi.string().optional(),
});

export default use(
  validateAccount(),
  captureErrors(),
  allowMethods(['POST']),
  validateBody(schema),
  changeKeyCase(),
  async function (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<CreateStripeAccountLinkResponse>>
  ) {
    // If we have an existing Stripe Connect ID from an account whose
    // setup is already in progress then we create a link with that ID.
    // If there's no Stripe Connect ID we create a new account.

    const accountId = req.headers['x-account-id'] as string;
    let stripeConnectId = req.body.stripe_connect_id;

    let stripeAccount: Stripe.Account;

    if (!stripeConnectId) {
      stripeAccount = await createStripeAccount();
      stripeConnectId = stripeAccount.id;

      if (stripeAccount) {
        await updateAccount({
          accountId,
          data: { content: { stripe_connect_id: stripeAccount.id } },
        });
      }
    }

    if (!stripeConnectId) {
      res
        .status(404)
        .send(
          getErrorResponse(ErrorCodes.INVALID_DATA)('Stripe account not found', [
            'Stripe account not found',
          ])
        );
      return;
    }

    const appURL = getRequestHost(req);
    const accountLink = await createStripeAccountLink({ stripeConnectId: stripeConnectId, appURL });

    if (checkAndHandleErrors<CreateStripeAccountLinkResponse>(accountLink, res)) {
      return;
    }

    res.status(200).send({ success: true, data: accountLink });
  }
);
