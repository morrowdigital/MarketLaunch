import { observer } from 'mobx-react-lite';
import { Order } from 'swell-js';
import { Stack } from 'tamagui';
import { ColoredField } from '~/components/colored-field';

type Props = {
  order: Order;
  width: string;
};

export const PaymentField = observer(function ({ order, width }: Props) {
  let paymentStatus = order.paid ? 'Paid' : 'Awaiting Payment';
  let statusColor = order.paid ? '$statusGreenFg' : '$statusRedFg';
  let statusBackgroundColor = order.paid ? '$statusGreenBg' : '$statusYellowBg';

  if (order.refunded) {
    paymentStatus = 'Refunded';
    statusColor = '$statusRedFg';
    statusBackgroundColor = '$statusRedBg';
  }

  return (
    <Stack width={width} alignItems="flex-start" justifyContent="center">
      <ColoredField
        backgroundColor={statusBackgroundColor}
        textColor={statusColor}
        value={paymentStatus}
      />
    </Stack>
  );
});
