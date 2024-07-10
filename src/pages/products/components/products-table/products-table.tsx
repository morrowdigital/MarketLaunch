import { YStack } from 'tamagui';
import { ProductsList } from './products-list';
import { Product } from '~/types/swell.types';
import { Header } from '~/components/table-header';

type Props = {
  products: Product[];
};

const titles = ['Product', 'Status', 'Updated', 'Stock', 'Min Price'];
export function ProductsTable({ products }: Props) {
  const width = `${100 / titles.length}%`;
  const titlesWithWidth = titles.map((title, index) => {
    return { name: title, width: index === 0 ? '30%' : width };
  });

  return (
    <YStack>
      <Header titles={titlesWithWidth} />
      <ProductsList products={products} columnWidth={width} />
    </YStack>
  );
}
