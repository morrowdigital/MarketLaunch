import { XStack } from 'tamagui';
import { BodyText } from '../../../../components/body-text';
import { Order } from 'swell-js';
import { observer } from 'mobx-react-lite';

type Props = {
  order: Order;
  width: string;
};

export const QuantityField = observer(function QuantityField({ order, width }: Props) {
  return (
    <XStack width={width} alignItems="center">
      <BodyText>{order.itemQuantity}</BodyText>
    </XStack>
  );
});
