import { XStack } from 'tamagui';
import {
  editButtonWidthPc,
  imageIconWidthPc,
} from '~/components/product-form/product-stock/product-stock-table-line/product-stock-table-line';
import { BodyText } from '~/components/body-text';

type Props = {
  columnWidth: string | number;
};

export function ProductStockTableHeader({ columnWidth }: Props) {
  return (
    <XStack gap="$4">
      <XStack width={`${imageIconWidthPc}%`} marginLeft="$3" />
      <BodyText width={columnWidth} bold paddingLeft={3}>
        Variant
      </BodyText>
      <BodyText width={columnWidth} bold paddingLeft={3}>
        SKU (optional)
      </BodyText>
      <BodyText width={columnWidth} bold paddingLeft={3}>
        Stock
      </BodyText>
      <BodyText width={columnWidth} bold paddingLeft={3}>
        Price
      </BodyText>
      <XStack width={`${editButtonWidthPc}%`} />
    </XStack>
  );
}
