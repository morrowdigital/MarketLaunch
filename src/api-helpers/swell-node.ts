// @ts-expect-error swell-node doesn't have types
import swell from 'swell-node';
import { appConfig } from '~/app-config/app-config';

export const getSwellClient = () => {
  swell.init(appConfig.NEXT_PUBLIC_SWELL_STORE_ID, appConfig.SWELL_SECRET_KEY);
  return swell;
};
