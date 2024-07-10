import { YStack, XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { VariantModal } from '~/components/variant-modal/variant-modal';
import { ProductVariant } from './product-variant';
import { observer } from 'mobx-react-lite';
import { useProductVariantsPresenter } from './product-variants.presenter';
import {
  ProductFormPresenterContext,
  useProductFormPresenterContext,
} from '~/components/product-form/product-form.presenter';

export const ProductVariants = observer(function ProductVariants() {
  const productFormPresenter = useProductFormPresenterContext();
  const { productOptions, deleteOption } = useProductVariantsPresenter(productFormPresenter);

  return (
    <ProductFormPresenterContext.Provider value={productFormPresenter}>
      <YStack space="$2">
        <BodyText bold>Variants</BodyText>
        <YStack backgroundColor="$gray2">
          {productOptions?.map((option, index) => (
            <ProductVariant key={index} option={option} deleteOption={deleteOption} />
          ))}
          <XStack padding="$4">
            <VariantModal />
          </XStack>
        </YStack>
      </YStack>
    </ProductFormPresenterContext.Provider>
  );
});
