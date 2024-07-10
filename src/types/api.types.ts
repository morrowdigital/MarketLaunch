/*
  This file contains types that we define for our own API endpoints 
*/

import Stripe from 'stripe';
import { FetchPaymentsSwellResponse, FetchProductsSwellResponse, Product } from './swell.types';
import { Product as SwellProduct, Order as SwellOrder, Settings, Account } from 'swell-js';

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  data: T;
};

export enum ErrorCodes {
  METHOD_NOT_ALLOWED = 'Method not allowed',
  INVALID_DATA = 'Invalid data',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  SWELL_ERROR = 'Swell Error',
}

export type ApiErrorResponse<E = unknown> = {
  success: false;
  source: 'swell' | 'api';
  code: ErrorCodes;
  message: string;
  details?: E;
};

export type ApiResponse<T = unknown, E = unknown> = ApiSuccessResponse<T> | ApiErrorResponse<E>;
export type Group = 'vendors' | 'buyers';

export type AccountExistsData = {
  email: string;
};

export type BuyerCreateData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};

export type VendorCreateData = BuyerCreateData & {
  content: {
    businessName?: string;
    contactEmail: string;
    vendorLogo?: string;
  };
};

export type BuyerCreateResponse = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  group: string;
  currency: string;
  name: string;
  dateCreated: string;
  type: string;
  orderCount: number;
  orderValue: number;
  balance: number;
  id: string;
};
export type VendorCreateResponse = BuyerCreateResponse & {
  content: {
    businessName?: string;
    contactEmail: string;
    vendorLogo?: string;
  };
};

export type FileUploadData = {
  contentType: string;
  base64Data: string;
};

export type FetchProductsResponse = Omit<FetchProductsSwellResponse, 'page_count'> & {
  pageCount: number;
};

export type FetchProductResponse = Product;
export type DeleteProductResponse = Omit<SwellProduct, 'vendor_id'> & {
  vendorId: string;
};
export type UpdateProductResponse = Omit<SwellProduct, 'vendor_id'> & {
  vendorId: string;
};

export type CreateProductResponse = Omit<SwellProduct, 'vendor_id'> & {
  vendorId: string;
};

export type AccountContentSnake = {
  business_name?: string;
  contact_email: string;
  vendor_logo?: string;
  stripe_connect_id?: string;
};

/* Todo: Find a way to convert the entire object to camel case */

export type StripeAccount = Omit<Stripe.Account, 'details_submitted'> & {
  detailsSubmitted: boolean;
};

export type CreateStripeAccountResponse = Stripe.Response<StripeAccount>;
export type FetchStripeAccountResponse = Stripe.Response<StripeAccount>;
export type CreateStripeAccountLinkResponse = Stripe.Response<Stripe.AccountLink>;

export type StripeStatus = 'pending' | 'paid' | 'failed' | 'cancelled';
export type ListStripePayoutsResponse = Stripe.Payout[];

export type FetchOrderDetailResponse = SwellOrder & {
  payments: FetchPaymentsSwellResponse;
  vendor_id: string;
};

export type Order = SwellOrder;

export type FetchSettingsResponse = {
  count: number;
  pageCount: number;
  page: number;
  results: Settings[];
};

export type FetchAccountsResponse = {
  count: number;
  pageCount: number;
  page: number;
  results: Account[];
};
