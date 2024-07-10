/*
  This file contains types uses by the front end
*/

import { Address } from 'swell-js';
import { ProductWithoutVariants } from './swell.types';

export type Account = {
  type: string;
  phone: string;
  order_value: number;
  order_count: number;
  name: string;
  last_name: string;
  group: 'buyers';
  first_name: string;
  email: string;
  date_created: string;
  balance: number;
  id: string;
  content?: AccountContent;
};

export type BuyerAccount = {
  type: string;
  phone: string;
  order_value: number;
  order_count: number;
  name: string;
  last_name: string;
  group: 'buyers';
  first_name: string;
  email: string;
  date_created: string;
  balance: number;
  id: string;
};

export type VendorAccount = BuyerAccount & {
  group: 'vendors';
  content: AccountContent;
};

export type AccountContent = {
  businessName?: string;
  contactEmail?: string;
  contactName?: string;
  contactPhone?: string;
  vendorLogo?: string;
  demoPayouts?: string;
  stripeConnectId?: string;
};

export type FormSubmitResult = { action: 'none' | 'error' | 'success'; error?: string };

export type AuthenticationStatuses = 'loading' | 'unauthenticated' | 'forbidden' | 'allowed';

export const enum Routes {
  Root = '/',
  Login = '/login',
  ForgotPassword = '/forgot-password',
  NewBuyer = '/new-buyer',
  NewVendor = '/new-vendor',
  Buyer = '/buyer',
  Orders = '/orders',
  Products = '/products',
  Payouts = '/payouts',
  Settings = '/settings',
  NewProduct = '/new-product',
}

export type TermsContentItem = {
  title?: string;
  body?: string;
};

export type OrderTableColumnField =
  | 'Order'
  | 'Date'
  | 'Customer'
  | 'Payment'
  | 'Fulfillment'
  | 'Total';

export type OrderTableFormatField = 'Currency' | 'Date' | 'Text';

export type OrderTableColumn = {
  data: string;
  format: OrderTableFormatField;
  field?: OrderTableColumnField;
  fontWeight?: 'bold' | 'normal';
  isHeader: boolean;
  orderNumber?: string;
  orderId?: string;
};

export type OrderTableFilters = {
  paid?: boolean;
  status?:
    | 'pending'
    | 'draft'
    | 'payment_pending'
    | 'delivery_pending'
    | 'hold'
    | 'complete'
    | 'canceled';
  refunded?: boolean;
};

export enum TableColumnLength {
  Long = '35%',
  Short = '21%',
}

export type FulfilOrderInput = {
  orderId: string;
  destination?: Partial<Address>;
  notes?: string;
  service?: string;
  items: { orderItemId: string; quantity: number; productId: string }[];
  trackingCode?: string;
  serviceName?: string;
  carrier?: string | null;
};

export type GetOrderInput = { orderId: string };
export type ProductStockStatus =
  | 'discontinued'
  | 'preorder'
  | 'backorder'
  | 'in_stock'
  | 'out_of_stock';

export type SelectOption = {
  value: string;
  label: string;
};

export type UpdateProductInput = { productId?: string; input: Partial<ProductWithoutVariants> };

export type StripeAccountInput = { stripeAccountId: string };

export type CarrierSettings = {
  id: string;
  name: string;
  enabled: boolean;
  params: {
    testMeter: null | string;
    testAccount: null | string;
    productionMeter: null | string;
    productionAccount: null | string;
  };
};

export type ServiceSettings = {
  id: string;
  carrier: string;
  name: string;
  description: string;
  enabled: boolean;
  packageWeight: number;
  rules: any[];
};

export type RecoverPasswordInput = {
  email?: string;
  resetUrl?: string;
  resetKey?: string;
  password?: string;
};
