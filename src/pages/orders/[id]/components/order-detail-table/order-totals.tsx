import { XStack, YStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { Order } from '~/types/api.types';
import { TableColumnLength } from '~/types/model';
import { observer } from 'mobx-react-lite';
import { appConfig } from '~/app-config/app-config';

type Props = {
  order: Order;
};

export const OrderDetailTableOrderTotals = observer(function OrderDetailTableOrderTotals({
  order,
}: Props) {
  const currencyFormatter = appConfig.currencyFormatter(order.currency);

  return (
    <YStack flex={1} padding={'$4'} backgroundColor={'$colorB'}>
      <XStack>
        <XStack width={TableColumnLength.Long}>
          <BodyText bold>Subtotal</BodyText>
        </XStack>

        <XStack width={TableColumnLength.Short}>
          <BodyText bold>{currencyFormatter(order.subTotal!.toString())}</BodyText>
        </XStack>
      </XStack>

      <XStack flex={1} paddingBottom={'$2'}>
        <XStack width={TableColumnLength.Long}>
          <BodyText bold>Shipping</BodyText>
        </XStack>

        <XStack width={TableColumnLength.Short}>
          <BodyText bold>{currencyFormatter(order.shipmentPrice!.toString())}</BodyText>
        </XStack>
      </XStack>

      <XStack flex={1} paddingBottom={'$2'}>
        <XStack width={TableColumnLength.Long}>
          <BodyText bold>Taxes</BodyText>
        </XStack>

        <XStack width={TableColumnLength.Short}>
          <BodyText bold>
            {order.taxes ? currencyFormatter(order.taxTotal!.toString()) : '-'}
          </BodyText>
        </XStack>
      </XStack>

      <XStack flex={1} paddingBottom={'$2'} paddingTop="$4">
        <XStack width={TableColumnLength.Long}>
          <BodyText bold>Total</BodyText>
        </XStack>

        <XStack width={TableColumnLength.Short}>
          <BodyText bold>{currencyFormatter(order.grandTotal!.toString())}</BodyText>
        </XStack>
      </XStack>
    </YStack>
  );
});
