import { generateCorsHeaders } from './cors';

interface GetAccountArgs {
  publicKey: string;
  gqlEndpoint: string;
  sessionCookie?: string;
  origin?: string;
}

export async function getAccountFromCookie({
  gqlEndpoint,
  publicKey,
  origin = '*',
  sessionCookie,
}: GetAccountArgs) {
  if (!sessionCookie) {
    return { error: 'NO_SESSION' };
  }

  const raw = JSON.stringify({
    operationName: null,
    variables: {},
    query: '{\n  session {\n    accountId\n  }\n}\n',
  });

  const myHeaders = generateCorsHeaders({
    origin,
    publicKey,
    sessionCookie,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const accountIdResponse = await fetch(gqlEndpoint!, requestOptions);
  const accountIdResult = await accountIdResponse.json();

  const accountId = accountIdResult?.data?.session?.accountId;
  if (!accountId) {
    return { error: 'UNAUTHORIZED' };
  }

  return {
    ...accountIdResult,
  };
}
