import {
  ApiResponse,
  CreateStripeAccountLinkResponse,
  CreateStripeAccountResponse,
  FetchStripeAccountResponse,
  ListStripePayoutsResponse,
  StripeStatus,
} from '~/types/api.types';
import { StripeAccountInput } from '~/types/model';

export async function getStripeAccount({ stripeAccountId }: StripeAccountInput) {
  const apiUrl = `/api/stripe/account/${stripeAccountId}`;
  const result = await fetch(apiUrl);

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<FetchStripeAccountResponse>;
  }

  throw new Error(body.message);
}

export async function createStripeAccount() {
  const apiUrl = `/api/stripe/create-account`;
  const result = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<CreateStripeAccountResponse>;
  }

  throw new Error(body.message);
}

export async function linkStripeAccount({ stripeConnectId }: { stripeConnectId?: string }) {
  const apiUrl = `/api/stripe/link-account`;
  const result = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ stripeConnectId }),
  });

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<CreateStripeAccountLinkResponse>;
  }

  throw new Error(body.message);
}

export async function listStripePayouts(stripeConnectId: string, filteredStatuses: StripeStatus[]) {
  const filteredStatusesJoined = filteredStatuses.join(',');
  const filteredStatusesQuery = filteredStatusesJoined
    ? `&filteredStatuses=${filteredStatusesJoined}`
    : '';
  const result = await fetch(
    `/api/stripe/list-payouts?stripeConnectId=${stripeConnectId}${filteredStatusesQuery}`
  );

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<ListStripePayoutsResponse>;
  }

  throw new Error(body.message);
}
