import {
  dataUriOrders,
  dataUriPayouts,
  dataUriProducts,
  dataUriSettings,
} from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/uri-generators';

export const enum NavIcons {
  Orders = 'orders',
  Products = 'products',
  Payouts = 'payouts',
  Settings = 'settings',
}

export const iconDefinitions: Record<
  NavIcons,
  { uriGenerator: (color: string) => string; height: number; width: number; alt: string }
> = {
  [NavIcons.Orders]: { uriGenerator: dataUriOrders, height: 14, width: 10, alt: 'orders icon' },
  [NavIcons.Products]: {
    uriGenerator: dataUriProducts,
    height: 17,
    width: 17,
    alt: 'products icon',
  },
  [NavIcons.Payouts]: { uriGenerator: dataUriPayouts, height: 15, width: 21, alt: 'payouts icon' },
  [NavIcons.Settings]: {
    uriGenerator: dataUriSettings,
    height: 16,
    width: 16,
    alt: 'settings icon',
  },
};
