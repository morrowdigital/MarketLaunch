import { XStack, YStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { ProductFormPresenterContext } from '../product-form.presenter';
import { observer } from 'mobx-react-lite';
import { StockModal } from '~/components/stock-modal/stock-modal';
import { ElevatedCard } from '~/components/elevated-card';
import {
  editButtonWidthPc,
  imageIconWidthPc,
  numOfFlexColumns,
  ProductStockTableLine,
} from '~/components/product-form/product-stock/product-stock-table-line/product-stock-table-line';
import { ProductStockTableHeader } from '~/components/product-form/product-stock/product-stock-table-header';
import { useProductFormPresenterContext } from '../product-form.presenter';

const columnWidth = `${(100 - imageIconWidthPc - editButtonWidthPc) / numOfFlexColumns}%`;

export const ProductStock = observer(function ProductStock() {
  const productFormPresenter = useProductFormPresenterContext();
  const { productStockVariants, productOptions } = productFormPresenter;

  return (
    <ProductFormPresenterContext.Provider value={productFormPresenter}>
      <YStack space="$2" paddingRight="$2">
        <BodyText bold>Stock</BodyText>
        <ElevatedCard backgroundColor="$gray2" paddingVertical="$4" elevation={20}>
          <ProductStockTableHeader columnWidth={columnWidth} />
          {productStockVariants.map((item, index, array) => (
            <ProductStockTableLine
              key={item.id}
              isLast={index === array.length - 1}
              item={item}
              columnWidth={columnWidth}
            />
          ))}
          <XStack marginTop="$4" marginLeft="$4">
            <StockModal
              disabled={productOptions.length === 0}
              triggerText="Add new stock variation"
              title="Add Variant"
            />
          </XStack>
        </ElevatedCard>
      </YStack>
    </ProductFormPresenterContext.Provider>
  );
});
