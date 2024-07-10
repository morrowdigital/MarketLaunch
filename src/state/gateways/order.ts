import { Order } from 'swell-js';
import { ApiResponse, FetchOrderDetailResponse } from '~/types/api.types';
import { FulfilOrderInput, OrderTableFilters } from '~/types/model';
import {
  FetchOrdersSwellResponse,
  CancelOrderResponse,
  ShipmentCreateResponse,
} from '~/types/swell.types';

export type GetOrdersInput = {
  page: number;
  limit?: number;
  filters: OrderTableFilters;
  vendor: boolean;
  search?: string;
};

export async function getOrders({ page, limit, filters, vendor, search }: GetOrdersInput) {
  const filterQuery = new URLSearchParams(filters as Record<string, string>).toString();
  const limitParam = limit ? `&limit=${limit}` : '';
  const vendorParam = vendor ? '&vendor=true' : '';
  const searchParam = search ? `&search=${search}` : '';
  const result = await fetch(
    `/api/orders?page=${page}&${filterQuery}${limitParam}${vendorParam}${searchParam}`
  );

  const body = await result.json();
  return body as ApiResponse<FetchOrdersSwellResponse>;
}

export type OrderInput = { orderId: string };

export async function getOrder({ orderId }: OrderInput) {
  const result = await fetch(`/api/orders/${orderId}`);

  const body = await result.json();
  return body as ApiResponse<FetchOrderDetailResponse>;
}

export async function fulfilOrder(input: FulfilOrderInput) {
  const result = await fetch(`/api/shipments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const body = await result.json();

  if (body.success) {
    return body as ApiResponse<ShipmentCreateResponse>;
  }

  throw new Error(body.message);
}

export type UpdateOrderInput = {
  orderId: string;
  order: Order;
};

export async function updateOrder({ orderId, order }: UpdateOrderInput) {
  const result = await fetch(`/api/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify(order),
  });

  const body = await result.json();
  if (body.success) {
    return body as ApiResponse<CancelOrderResponse>;
  }

  throw new Error(body.message);
}

export async function cancelOrder({ orderId, order }: UpdateOrderInput) {
  const result = await fetch(`/api/orders/${orderId}/cancel`, {
    method: 'PUT',
    body: JSON.stringify(order),
  });

  const body = await result.json();

  if (body.success) {
    return body as ApiResponse<CancelOrderResponse>;
  }

  throw new Error(body.message);
}
