import { XStack, YStack, H1 } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { CardIcon } from '~/components/icons/icons';
import { Order } from '~/types/api.types';
import { TableColumnLength } from '~/types/model';
import { observer } from 'mobx-react-lite';
import { appConfig } from '~/app-config/app-config';

type Props = {
  order: Order;
};

export const OrderDetailTablePayment = observer(function OrderDetailTablePayment({ order }: Props) {
  const card = order.billing?.card;
  const currencyFormatter = appConfig.currencyFormatter(order.currency);

  return (
    <XStack flex={1} padding={'$4'} marginTop="$4" backgroundColor={'$colorB'}>
      <YStack width={TableColumnLength.Long} paddingVertical="$4">
        <XStack>
          <CardIcon scale={2} />
          <BodyText bold>Payment</BodyText>
        </XStack>

        <XStack>
          <H1 fontWeight="bold">{currencyFormatter(order.paymentTotal!)}</H1>
        </XStack>
      </YStack>

      <XStack width={TableColumnLength.Long} alignItems="flex-end" paddingVertical="$4">
        {card ? (
          <BodyText>
            {card.brand} card ending {card.last4} expires {card.expMonth}/{card.expYear}
          </BodyText>
        ) : null}
      </XStack>
    </XStack>
  );
});
