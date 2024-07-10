import { ProductStatusField } from './product-status-field';
import { ProductImageField } from './product-image-field';
import { ProductStockField } from './product-stock-field';
import { ProductPriceField } from './product-price-field';
import { useRouter } from 'next/router';
import { Routes } from '~/types/model';
import { Product } from '~/types/swell.types';
import { TableRow } from '~/components/table-row';
import { DateField } from '~/components/table-date-field';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

type Props = {
  products: Product[];
  columnWidth: string;
};

export const ProductsList = observer(function ProductsList({ products, columnWidth }: Props) {
  const router = useRouter();

  const navigateToOrderDetailsPage = (productId?: string) => {
    productId && router.push(Routes.Products + `/${productId}`);
  };

  return (
    <>
      {products.map((product) => (
        <TableRow onPress={action(() => navigateToOrderDetailsPage(product.id))} key={product.id}>
          <ProductImageField product={product} width={columnWidth} />
          <ProductStatusField product={product} width={columnWidth} />
          <DateField date={product.dateUpdated || product.dateCreated!} width={columnWidth} />
          <ProductStockField product={product} width={columnWidth} />
          <ProductPriceField product={product} width={columnWidth} />
        </TableRow>
      ))}
    </>
  );
});
