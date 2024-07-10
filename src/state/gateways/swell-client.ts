import swell from 'swell-js';
import { appConfig } from '~/app-config/app-config';

export function getSwellClient(
  storeId = appConfig.NEXT_PUBLIC_SWELL_STORE_ID,
  publicKey = appConfig.NEXT_PUBLIC_SWELL_PUBLIC_KEY
) {
  swell.init(storeId, publicKey);

  return swell;
}

export const swellClient = getSwellClient();
