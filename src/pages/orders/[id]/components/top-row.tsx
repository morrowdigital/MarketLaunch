import { XStack, YStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { format } from 'date-fns';
import { Order } from '~/types/api.types';
import { appConfig } from '~/app-config/app-config';
import { observer } from 'mobx-react-lite';

type Props = {
  order: Order;
};

export const TopRow = observer(function TopRow({ order }: Props) {
  let paymentStatus = order?.paid ? 'Paid' : 'Awaiting Payment';
  let fulfilmentStatus = order?.delivered ? 'Sent' : 'Awaiting Delivery';

  if (order.refunded) {
    paymentStatus = 'Refunded';
  }

  if (order.canceled) {
    fulfilmentStatus = 'Canceled';
  }

  const status = `${paymentStatus} - ${fulfilmentStatus}`;

  const dateCreated = order?.dateCreated
    ? format(new Date(order!.dateCreated!), appConfig.dateFormat)
    : '';
  const dateUpdated = order?.dateUpdated
    ? format(new Date(order!.dateUpdated!), appConfig.dateFormat)
    : '';

  return (
    <XStack
      justifyContent="space-between"
      backgroundColor={'$colorB'}
      flexWrap="wrap"
      padding="$4"
      space
    >
      <YStack>
        <BodyText bold>Created</BodyText>
        <BodyText>{dateCreated}</BodyText>
      </YStack>

      <YStack>
        <BodyText bold>Updated</BodyText>
        <BodyText>{dateUpdated}</BodyText>
      </YStack>

      <YStack>
        <BodyText bold>Status</BodyText>
        <BodyText>{status}</BodyText>
      </YStack>
    </XStack>
  );
});
