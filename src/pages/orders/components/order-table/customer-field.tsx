import { Stack } from 'tamagui';
import { observer } from 'mobx-react-lite';
import { Order } from 'swell-js';
import { BodyText } from '~/components/body-text';

type Props = {
  order: Order;
  width: string;
};

export const CustomerField = observer(function CustomerField({ order, width }: Props) {
  const customerName = order.account!.firstName! + ' ' + order.account!.lastName;

  return (
    <Stack width={width} justifyContent="center">
      <BodyText>{customerName}</BodyText>
    </Stack>
  );
});
