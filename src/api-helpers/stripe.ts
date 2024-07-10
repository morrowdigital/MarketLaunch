import { appConfig } from '~/app-config/app-config';
import { getStripeClient } from './stripe-client';
import { StripeStatus } from '~/types/api.types';

export async function createStripeAccount() {
  const stripe = getStripeClient();
  return await stripe.accounts.create({
    type: 'express',
  });
}

export async function createStripeAccountLink({
  stripeConnectId,
  appURL,
}: {
  stripeConnectId: string;
  appURL: string;
}) {
  // This function generates a link that will be used to collect the banking and business
  // information from the vendor to complete the onboarding process

  const stripe = getStripeClient();
  return await stripe.accountLinks.create({
    account: stripeConnectId,
    refresh_url: `${appURL}/payouts`,
    return_url: `${appURL}/payouts?success=true`,
    type: 'account_onboarding',
  });
}

export async function getStripePayouts(stripeConnectId: string, filteredStatuses: StripeStatus[]) {
  // We cannot use the filtering built-in to the API as it only supports fetching one status
  // at a time, so we use auto-pagination and build our own response array.
  const stripe = getStripeClient();
  const options = { stripeAccount: stripeConnectId };
  const params = { limit: appConfig.payoutsPaginationLimit };

  const payouts = [];
  for await (const payout of stripe.payouts.list(params, options)) {
    if (filteredStatuses.length === 0 || filteredStatuses.includes(payout.status as StripeStatus)) {
      if (payouts.push(payout) === appConfig.payoutsPaginationLimit) {
        break;
      }
    }
  }

  return payouts;
}
