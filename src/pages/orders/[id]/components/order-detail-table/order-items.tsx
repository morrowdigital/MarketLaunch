import { XStack, YStack } from 'tamagui';
import Image from 'next/image';

import { BodyText } from '~/components/body-text';
import { Order } from '~/types/api.types';
import { OrderItemCamel } from 'swell-js/types/order/camel';
import { TableColumnLength } from '~/types/model';
import { imageHeightScaleFactor } from '~/utils/image-scale-factor';
import { observer } from 'mobx-react-lite';
import { appConfig } from '~/app-config/app-config';

type Props = {
  order: Order;
  hideItemImage: boolean;
};

export const OrderDetailTableOrderItems = observer(function OrderDetailTableOrderItems({
  order,
  hideItemImage,
}: Props) {
  const currencyFormatter = appConfig.currencyFormatter(order.currency);

  return (
    <YStack flex={1} borderBottomWidth={0.5} padding={'$4'} backgroundColor={'$colorB'}>
      {order.items?.map((item: OrderItemCamel, index) => {
        const image = item.product?.images?.[0];
        const scaleFactor = imageHeightScaleFactor(image);

        return (
          <XStack flex={1} key={index} marginVertical="$2">
            <XStack width={TableColumnLength.Long} alignItems="center">
              {image && !hideItemImage && (
                <Image
                  src={image.file!.url!}
                  alt="Product Image"
                  width={100}
                  height={100 * scaleFactor!}
                />
              )}
              <BodyText bold>{item.productName}</BodyText>
            </XStack>

            <XStack width={TableColumnLength.Short} alignItems="center">
              {item.quantity}
            </XStack>
            <XStack width={TableColumnLength.Short} alignItems="center">
              <BodyText>{currencyFormatter(item.price!.toString())}</BodyText>
            </XStack>
            <XStack width={TableColumnLength.Short} alignItems="center">
              <BodyText>{currencyFormatter(item.priceTotal!.toString())}</BodyText>
            </XStack>
          </XStack>
        );
      })}
    </YStack>
  );
});
