import { Variant } from 'swell-js/types/product';
import { XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { StockModal } from '~/components/stock-modal/stock-modal';
import { observer } from 'mobx-react-lite';
import { InputDelta } from '~/components/input-delta';
import { useProductStockTableLinePresenter } from './product-stock-table-line-presenter';
import { ProductImagePicker } from '~/components/product-image-picker';
import { SpinnerThemed } from '~/components/spinner-themed';
import { InputSimple } from '~/components/input-simple';
import {
  ProductFormPresenterContext,
  useProductFormPresenterContext,
} from '../../product-form.presenter';

export const imageIconWidthPc = 10;
export const editButtonWidthPc = 10;
export const numOfFlexColumns = 4;

type Props = {
  isLast: boolean;
  item: Variant;
  columnWidth: string | number;
};

export const ProductStockTableLine = observer(function ProductStockTableLine({
  isLast,
  item,
  columnWidth,
}: Props) {
  const productFormPresenter = useProductFormPresenterContext();
  const {
    variant,
    updateVariantSku,
    updateVariantPrice,
    priceString,
    stockString,
    updateVariantStock,
    updateVariantImage,
    isUploadingImage,
  } = useProductStockTableLinePresenter(item);

  if (!variant) {
    return null;
  }

  return (
    <ProductFormPresenterContext.Provider value={productFormPresenter}>
      <XStack
        paddingVertical="$3"
        paddingLeft="$4"
        gap="$4"
        alignItems="center"
        borderTopColor="$faint"
        borderTopWidth={2}
        borderBottomColor="$faint"
        borderBottomWidth={isLast ? 2 : 0}
      >
        <XStack width={`${imageIconWidthPc}%`} alignItems="center">
          <ProductImagePicker
            size={50}
            smallIcon
            backgroundColor="transparent"
            onImagePicked={updateVariantImage}
            imageUrl={variant?.images?.[0]?.file?.url}
          />
          {isUploadingImage && <SpinnerThemed />}
        </XStack>

        <BodyText width={columnWidth}>{item.name}</BodyText>
        <InputSimple
          width={columnWidth}
          value={variant?.sku || ''}
          borderRadius="$5"
          onChangeText={updateVariantSku}
          placeholder="Variant SKU"
        />
        <InputSimple
          width={columnWidth}
          value={stockString}
          placeholder="100"
          borderRadius="$5"
          onChangeText={updateVariantStock}
        />
        <InputDelta
          width={columnWidth}
          value={priceString}
          borderRadius="$5"
          onBlurValueChange={async (price) => updateVariantPrice(price)}
          placeholder="$"
        />
        <XStack justifyContent="flex-end" width={`${editButtonWidthPc}%`} paddingRight="$4">
          <StockModal triggerText="Edit" variant={item} title="Edit Variant" />
        </XStack>
      </XStack>
    </ProductFormPresenterContext.Provider>
  );
});
