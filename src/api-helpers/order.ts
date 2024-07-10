import { appConfig } from '~/app-config/app-config';
import { getSwellClient } from './swell-node';
import { RefundPaymentSwellResponse, UpdateOrderSwellResponse } from '~/types/swell.types';
import { Order } from 'swell-js';
import { makeSnakeCaseKeys } from '~/utils/case';
import { FetchOrderDetailResponse } from '~/types/api.types';

type OrderInput = {
  orderId: string;
};

export async function getOrder({ orderId }: OrderInput) {
  const client = getSwellClient();

  const response = await client.get(`/orders/${orderId}`, {
    expand: ['account', 'items.product', 'shipments'],
    include: {
      payments: {
        url: '/payments',
        params: {
          order_id: 'id',
        },
      },
    },
    limit: appConfig.ordersPaginationLimit,
  });
  client.close();

  return response as FetchOrderDetailResponse;
}

type UpdateOrderInput = {
  orderId: string;
  order: Partial<Order>;
};

export async function updateOrder({ orderId, order }: UpdateOrderInput) {
  const client = getSwellClient();

  const response = await client.put(`/orders/${orderId}`, order);
  client.close();

  return response as UpdateOrderSwellResponse;
}

type RefundPaymentInput = {
  method: string;
  amount: number;
  parentId: string;
};

export async function refundPayment(input: RefundPaymentInput) {
  const client = getSwellClient();

  const body = makeSnakeCaseKeys(input);
  const response = await client.post('/payments:refunds', body);
  client.close();

  return response as RefundPaymentSwellResponse;
}
