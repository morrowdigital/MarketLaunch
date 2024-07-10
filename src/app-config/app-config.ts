import Stripe from 'stripe';
import { Group } from '~/types/api.types';
import { Routes, TermsContentItem } from '~/types/model';

/**
 * Describes the environment variables that are required for the application to run.
 */
export type EnvVars = {
  SWELL_SECRET_KEY: string;
  NEXT_PUBLIC_SWELL_STORE_ID: string;
  NEXT_PUBLIC_SWELL_PUBLIC_KEY: string;
  NEXT_PUBLIC_SWELL_GQL_ENDPOINT: string;
  STRIPE_API_KEY: string;
  STRIPE_API_VERSION: Stripe.LatestApiVersion;
};

type StatusColor = {
  background: string;
  font: string;
};

type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

const termsAndConditions: TermsContentItem[] = [
  {
    title: 'This is a section title in the terms and conditions',
    body: 'This is a body of text within the terms and conditions. The content for the terms and conditions and the privacy policy are set within the market_launch_config.json file. Within this you can set as many sections as you need within your market places terms and privacy pages.',
  },
];

const privacy: TermsContentItem[] = [
  {
    title: 'This is a section title in the terms and conditions',
    body: 'This is a body of text within the terms and conditions. The content for the terms and conditions and the privacy policy are set within the market_launch_config.json file. Within this you can set as many sections as you need within your market places terms and privacy pages.',
  },
  {
    title: 'This is a another section title',
    body: 'This is a body of text within the terms and conditions. The content for the terms and conditions and the privacy policy are set within the market_launch_config.json file. Within this you can set as many sections as you need within your market places terms and privacy pages.',
  },
];

const title = 'MarketLaunch | Quickly Build a Marketplace with Swell';
const description =
  'MarketLaunch is a development starter kit, built by AppLaunch, that enables you to quickly build out high functional marketplace powered by the Swell platform';

/**
 * Extends EnvVars Type with additional static app-wide configuration.
 */
export type AppConfig = EnvVars & {
  platformFeePercentage: number;
  ordersPaginationLimit: number;
  payoutsPaginationLimit: number;
  productsPaginationLimit: number;
  defaultRoutes: Record<Group, Routes>;
  currencyFormatter: (currencyCode?: string) => (price: string) => string;
  dateFormat: string;
  termsAndConditions: TermsContentItem[];
  privacy: TermsContentItem[];
  meta: {
    title: string;
    description: string;
  };
  theme: {
    appName: string;
    logo: string;
    colors: {
      colorA: string;
      colorB: string;
      colorC: string;
      colorD: string;
      colorE: string;
      colorF: string;
    };
    statusColors: {
      green: StatusColor;
      red: StatusColor;
      yellow: StatusColor;
      lightgreen: StatusColor;
    };
    fontFamily: string;
    fontSizes: {
      body: number;
      h2: number;
      h1: number;
    };
    fontWeights: {
      normal: FontWeight;
      bold: FontWeight;
    };
  };
};

/**
 * The application configuration.
 */
export const appConfig: AppConfig = {
  SWELL_SECRET_KEY: process.env.SWELL_SECRET_KEY!,
  NEXT_PUBLIC_SWELL_STORE_ID: process.env.NEXT_PUBLIC_SWELL_STORE_ID!,
  NEXT_PUBLIC_SWELL_PUBLIC_KEY: process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY!,
  STRIPE_API_VERSION: process.env.NEXT_PUBLIC_SWELL_API_VERSION! as Stripe.LatestApiVersion,
  NEXT_PUBLIC_SWELL_GQL_ENDPOINT: `https://${process.env
    .NEXT_PUBLIC_SWELL_STORE_ID!}.swell.store/graphql`,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY!,
  platformFeePercentage: 0.2,
  ordersPaginationLimit: 50,
  payoutsPaginationLimit: 25,
  productsPaginationLimit: 25,
  defaultRoutes: {
    vendors: Routes.Orders,
    buyers: Routes.Orders,
  },
  // Default implementation ignores currency code, however this may be overwritten with any logic.
  currencyFormatter: (_currencyCode) => (price) => `$${price}`,
  dateFormat: 'dd/MM/yyyy hh:mm aaa',
  termsAndConditions,
  privacy,
  meta: {
    title,
    description,
  },
  theme: {
    appName: 'MarketLaunch',
    logo: '/app-logo.png',
    colors: {
      colorA: '#006f79',
      colorB: '#fafafa',
      colorC: '#1a9aa6',
      colorD: '#78eaa6',
      colorE: '#ffcd7d',
      colorF: '#c7dadd',
    },
    statusColors: {
      green: {
        background: '#1a9aa6',
        font: '#ffffff',
      },
      red: {
        background: 'rgba(215,134,134,0.6)',
        font: '#006f79',
      },
      yellow: {
        background: '#ffcd7d',
        font: '#006f79',
      },
      lightgreen: {
        background: '#78eaa6',
        font: '#006f79',
      },
    },
    fontFamily: 'DM Sans, sans-serif',
    fontSizes: {
      body: 14,
      h2: 20,
      h1: 30,
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  },
};
