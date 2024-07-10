import { XStack } from 'tamagui';
import { BodyText } from '../../../../components/body-text';
import { Product } from '~/types/swell.types';
import { observer } from 'mobx-react-lite';

type Props = {
  product: Product;
  width: string;
};

export const ProductStockField = observer(function ProductStockField({ product, width }: Props) {
  return (
    <XStack width={width} alignItems="center">
      <BodyText>{product.stockLevel}</BodyText>
    </XStack>
  );
});
