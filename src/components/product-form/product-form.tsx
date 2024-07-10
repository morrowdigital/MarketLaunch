import { YStack, XStack, Input, Spinner } from 'tamagui';
import { ProductNameField } from './product-name-field';
import { ProductDescriptionField } from './product-description-field';
import { ProductImages } from './product-images/product-images';
import { ProductStock } from './product-stock/product-stock';
import { Product } from '~/types/swell.types';
import { BodyText } from '../body-text';
import { StatusSelect } from './status-select';
import { ProductVariants } from '~/components/product-form/product-variants/product-variants';
import { ProductFormPresenterContext, useProductFormPresenter } from './product-form.presenter';
import { observer } from 'mobx-react-lite';
import { DarkButton } from '../dark-button';
import { useEffect } from 'react';

type Props = {
  product?: Product;
};

export const ProductForm = observer(function ProductForm({ product }: Props) {
  const presenter = useProductFormPresenter();
  const {
    setProductName,
    setProductDescription,
    productName,
    productSKU,
    setProductSKU,
    setProductStatus,
    productStatus,
    setProduct,
    isSavingProduct,
    save,
  } = presenter;

  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [setProduct, product]);

  return (
    <ProductFormPresenterContext.Provider value={presenter}>
      <XStack
        flex={1}
        justifyContent="space-between"
        alignItems="flex-start"
        borderTopWidth={1}
        borderTopColor={'colorC'}
        paddingTop={'$4'}
      >
        <YStack space="$4" flex={1}>
          <ProductNameField productName={productName} onChangeText={setProductName} />
          <ProductDescriptionField product={product} onChangeText={setProductDescription} />
          <ProductImages />
          <ProductVariants />
          <ProductStock />
          <XStack>
            <DarkButton
              onPress={save}
              paddingVertical="$2"
              icon={isSavingProduct ? <Spinner /> : null}
            >
              Save
            </DarkButton>
          </XStack>
        </YStack>
        <YStack backgroundColor={'$colorA'} padding="$4" space="$4" borderRadius={'$4'}>
          <YStack>
            <BodyText color="white">SKU</BodyText>
            <Input value={productSKU} onChangeText={setProductSKU} />
          </YStack>

          <YStack>
            <BodyText color="white">Product Status</BodyText>
            <StatusSelect value={productStatus} onValueChange={setProductStatus} />
          </YStack>
        </YStack>
      </XStack>
    </ProductFormPresenterContext.Provider>
  );
});
