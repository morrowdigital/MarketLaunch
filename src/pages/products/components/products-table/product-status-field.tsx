import { Product } from '~/types/swell.types';
import { XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { observer } from 'mobx-react-lite';
import { productStates } from '~/utils/product-states';

type Props = {
  product: Product;
  width: string;
};
export const ProductStatusField = observer(function ProductStatusField({ product, width }: Props) {
  let stockStatus = 'Active';
  if (product.content?.stockStatus !== undefined) {
    stockStatus = productStates[product.content.stockStatus];
  }

  return (
    <XStack width={width} alignItems="center">
      <BodyText>{stockStatus}</BodyText>
    </XStack>
  );
});
