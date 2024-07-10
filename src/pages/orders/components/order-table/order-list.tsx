import { Order } from 'swell-js';
import { PaymentField } from './payment-field';
import { FulfilmentField } from './fulfilment-field';
import { OrderNumberField } from './order-number-field';
import { QuantityField } from './quantity-field';
import { TotalField } from './total-field';
import { TableRow } from '~/components/table-row';
import { useRouter } from 'next/router';
import { Account, Routes } from '~/types/model';
import { DateField } from '~/components/table-date-field';
import { observer } from 'mobx-react-lite';
import { CustomerField } from './customer-field';

type Props = {
  orders: Order[];
  account: Account;
  columnWidth: string;
};

type FieldProps = {
  order: Order;
  account: Account;
  width: string;
};

const OrderField = observer(function OrderField({ order, account, width }: FieldProps) {
  if (account.group === 'buyers') {
    return <QuantityField order={order} width={width} />;
  } else {
    return <CustomerField order={order} width={width} />;
  }
});

export const OrderList = observer(function OrderList({ orders, account, columnWidth }: Props) {
  const router = useRouter();

  const navigateToOrderDetailsPage = (orderId?: string) => {
    orderId && router.push(Routes.Orders + `/${orderId}`);
  };

  return (
    <>
      {orders.map((order) => (
        <TableRow
          key={order.id}
          paddingVertical={'$4'}
          borderBottomWidth={0.5}
          borderBottomColor={'$faint'}
          onPress={() => navigateToOrderDetailsPage(order.id)}
        >
          <OrderNumberField order={order} width={columnWidth} />
          <DateField date={order.dateCreated!} width={columnWidth} />
          <OrderField order={order} account={account} width={columnWidth}></OrderField>
          <PaymentField order={order} width={columnWidth} />
          <FulfilmentField order={order} width={columnWidth} />
          <TotalField order={order} width={columnWidth} />
        </TableRow>
      ))}
    </>
  );
});
