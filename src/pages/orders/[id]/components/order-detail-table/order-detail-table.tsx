import { YStack } from 'tamagui';
import { OrderDetailTableHeader } from './header';
import { OrderDetailTableOrderItems } from './order-items';
import { OrderDetailTableOrderTotals } from './order-totals';
import { OrderDetailTablePayment } from './payment';
import { Order } from '~/types/api.types';

type Props = {
  order: Order;
  hideItemImage: boolean;
};

export function OrderDetailTable({ order, hideItemImage }: Props) {
  return (
    <YStack flex={1}>
      <OrderDetailTableHeader />
      <OrderDetailTableOrderItems order={order} hideItemImage={hideItemImage} />
      <OrderDetailTableOrderTotals order={order} />
      <OrderDetailTablePayment order={order} />
    </YStack>
  );
}
