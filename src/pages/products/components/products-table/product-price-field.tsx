import { XStack } from 'tamagui';
import { BodyText } from '../../../../components/body-text';
import { Product } from '~/types/swell.types';
import { useProductPriceFieldPresenter } from './product-price-field.presenter';
import { observer } from 'mobx-react-lite';

type Props = {
  product: Product;
  width: string;
};

export const ProductPriceField = observer(function ProductPriceField({ product, width }: Props) {
  const { getMinVariantPrice } = useProductPriceFieldPresenter();

  return (
    <XStack width={width} alignItems="center">
      <BodyText>{getMinVariantPrice(product)}</BodyText>
    </XStack>
  );
});
