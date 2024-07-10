import { ProductOption } from 'swell-js';
import { XStack, YStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { DarkButton } from '~/components/dark-button';
import { VariantModal } from '~/components/variant-modal/variant-modal';
import {
  ProductFormPresenterContext,
  useProductFormPresenterContext,
} from '../product-form.presenter';
import { observer } from 'mobx-react-lite';

type Props = {
  option?: ProductOption;
  deleteOption: (option: ProductOption) => void;
};

export const ProductVariant = observer(function ProductVariant({ option, deleteOption }: Props) {
  const productFormPresenter = useProductFormPresenterContext();

  return (
    <ProductFormPresenterContext.Provider value={productFormPresenter}>
      <YStack space="$2" padding="$4">
        <BodyText bold>{option?.name}</BodyText>
        <XStack justifyContent="space-between">
          <XStack space="$2">
            {option?.values?.map((value) => (
              <DarkButton square backgroundColor="$colorC" key={value.id!}>
                {value.name}
              </DarkButton>
            ))}
          </XStack>
          <VariantModal option={option} deleteOption={deleteOption} />
        </XStack>
      </YStack>
    </ProductFormPresenterContext.Provider>
  );
});
