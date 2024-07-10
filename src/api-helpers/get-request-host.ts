import { NextApiRequest } from 'next';

export function getRequestHost(request: NextApiRequest) {
  const protocol = request.headers.referer?.split('://')?.[0];
  const host = request.headers.host;

  return `${protocol}://${host}`;
}
