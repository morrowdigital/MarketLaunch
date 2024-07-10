interface IGenerateCorsHeadersArgs {
  publicKey: string;
  origin: string;
  sessionCookie?: string;
}

export const generateCorsHeaders = ({
  publicKey,
  origin,
  sessionCookie,
}: IGenerateCorsHeadersArgs) => {
  const myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('authorization', publicKey);
  myHeaders.append('content-type', 'application/json');
  myHeaders.append('Access-Control-Allow-Origin', origin);
  myHeaders.append('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
  myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
  myHeaders.append('Access-Control-Expose-Headers', 'set-cookie');
  myHeaders.append('Access-Control-Allow-Credentials', 'true');

  if (sessionCookie) {
    myHeaders.append('x-session', sessionCookie);
  }

  return myHeaders;
};
