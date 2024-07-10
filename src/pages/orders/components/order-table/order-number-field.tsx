import { XStack } from 'tamagui';
import { Order } from 'swell-js';
import { BodyText } from '~/components/body-text';
import { observer } from 'mobx-react-lite';

type Props = {
  order: Order;
  width: string;
};

export const OrderNumberField = observer(function OrderNumberField({ order, width }: Props) {
  return (
    <XStack width={width} alignItems="center">
      <BodyText bold>{order.number}</BodyText>
    </XStack>
  );
});
