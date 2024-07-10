import { Order } from 'swell-js';
import { YStack } from 'tamagui';
import { OrderList } from './order-list';
import { Header } from '~/components/table-header';
import { Account } from '~/types/model';
import { observer } from 'mobx-react-lite';

type Props = {
  orders: Order[];
  account: Account;
};

const titlesMap = {
  buyers: ['Order', 'Date', 'No. Items', 'Payment', 'Fulfilment', 'Total'],
  vendors: ['Order', 'Date', 'Customer', 'Payment', 'Fulfilment', 'Total'],
};

export const OrderTable = observer(function OrderTable({ orders, account }: Props) {
  const titles = titlesMap[account.group];
  const width = `${100 / titles.length}%`;
  const titlesWithWidth = titles.map((title) => {
    return { name: title, width: width };
  });

  return (
    <YStack>
      <Header titles={titlesWithWidth} />
      <OrderList orders={orders} account={account} columnWidth={width} />
    </YStack>
  );
});
