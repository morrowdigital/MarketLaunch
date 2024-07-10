import { XStack } from 'tamagui';
import { BodyText } from '../../../../components/body-text';
import { Order } from 'swell-js';
import { observer } from 'mobx-react-lite';
import { appConfig } from '~/app-config/app-config';

type Props = {
  order: Order;
  width: string;
};

export const TotalField = observer(function TotalField({ order, width }: Props) {
  const currencyFormatter = appConfig.currencyFormatter(order.currency);

  return (
    <XStack width={width} alignItems="center">
      <BodyText>{currencyFormatter(order.grandTotal!.toString())}</BodyText>
    </XStack>
  );
});
