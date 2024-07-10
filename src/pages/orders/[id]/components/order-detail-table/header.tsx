import { XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { TableColumnLength } from '~/types/model';

export function OrderDetailTableHeader() {
  return (
    <XStack flex={1} borderBottomWidth={0.5} padding={'$4'} backgroundColor={'$colorB'}>
      <XStack width={TableColumnLength.Long}>
        <BodyText bold>Items</BodyText>
      </XStack>

      <XStack width={TableColumnLength.Short}>
        <BodyText bold>Qty</BodyText>
      </XStack>

      <XStack width={TableColumnLength.Short}>
        <BodyText bold>Price</BodyText>
      </XStack>

      <XStack width={TableColumnLength.Short}>
        <BodyText bold>Total</BodyText>
      </XStack>
    </XStack>
  );
}
