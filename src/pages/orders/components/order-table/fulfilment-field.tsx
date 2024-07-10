import { Order } from 'swell-js';
import { XStack } from 'tamagui';
import { observer } from 'mobx-react-lite';
import { Circle } from 'tamagui';
import { BodyText } from '~/components/body-text';

type Props = {
  order: Order;
  width: string;
};

export const FulfilmentField = observer(function FulfilmentField({ order, width }: Props) {
  let circleColor = order?.status === 'delivery_pending' ? '$statusYellowBg' : '$statusGreenBg';
  let status = order?.delivered ? 'Fulfilled' : 'Pending';

  if (order.canceled) {
    circleColor = '$statusRedBg';
    status = 'Canceled';
  }

  return (
    <XStack width={width} alignItems="center" space="$1.5">
      <Circle size="$1" backgroundColor={circleColor} />
      <BodyText>{status}</BodyText>
    </XStack>
  );
});
