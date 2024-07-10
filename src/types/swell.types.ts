/*
  This file contains types returned by the Swell API
*/
import { Account, Order, Payment, Product as SwellProduct, Variant } from 'swell-js';
import { Refund } from 'swell-js/types/refund';
import { ProductStockStatus } from './model';

/** Errors **/
export type SwellError = {
  code: string;
  message: string;
  params?: { [key in string]: string };
};
export type SwellErrorResponse = {
  errors: { [key in string]: SwellError };
};

/** Accounts **/
export type BuyerCreateSwellResponse = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  group: string;
  currency: string;
  name: string;
  date_created: string;
  type: string;
  order_count: number;
  order_value: number;
  balance: number;
  id: string;
};
export type VendorCreateSwellResponse = BuyerCreateSwellResponse & {
  content: {
    business_name?: string;
    contact_email: string;
  };
};

export type FetchAccountSwellResponse = Account;
export type UpdateAccountSwellResponse = Account;

/** Files **/
export type FileCreateSwellResponse = {
  length: number;
  chunkSize: number;
  uploadDate: string;
  filename?: string;
  date_uploaded: string;
  md5: string;
  url: string;
  id: string;
};

/** Payments **/

export type FetchPaymentsSwellResponse = {
  count: number;
  pageCount: number;
  page: number;
  results: Payment[];
};

/** Orders **/

export type FetchOrdersSwellResponse = {
  count: number;
  pageCount: number;
  page: number;
  results: Order[];
};

export type CancelOrderResponse = Order;
export type UpdateOrderSwellResponse = Order;
export type RefundPaymentSwellResponse = Refund;

/** Shipments **/

export type ShipmentCreateResponse = {
  dateCreated: string;
  id: string;
  destination: {
    price: null | number;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    country: string;
    state: string;
    phone: string;
    name: string;
    accountAddressId: string;
  };
  items: {
    orderItemId: string;
    productId: string;
    quantity: number;
    id: string;
  }[];
  orderId: string;
  number: string;
};

/** Products **/

export type FetchProductVariantsSwellResponse = {
  count: number;
  page_count: number;
  page: number;
  results: Variant[];
};

export type ProductWithoutVariants = SwellProduct & {
  vendor_id: string;
  content: {
    stockStatus?: ProductStockStatus;
  };
};

export type Product = Omit<ProductWithoutVariants, 'variants'> & {
  variants: FetchProductVariantsSwellResponse;
};

export type DeleteProductSwellResponse = Product;
export type FetchProductSwellResponse = Product;
export type UpdateProductSwellResponse = Product;
export type CreateProductSwellResponse = Product;

export type FetchProductsSwellResponse = {
  count: number;
  page_count: number;
  page: number;
  results: Product[];
};

export type SwellProductStock = {
  parent_id: string;
  variant_id: string;
  quantity: number;
  reason: string;
  reason_message: null;
  prev_id: null;
  level: number;
  date_created: string;
  number: string;
  id: string;
  variant: Variant;
};

export type FetchProductStockSwellResponse = {
  count: number;
  page_count: number;
  page: number;
  results: SwellProductStock[];
};
