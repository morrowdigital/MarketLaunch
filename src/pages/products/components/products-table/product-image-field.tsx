import { Stack, XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import Image from 'next/image';
import { imageHeightScaleFactor } from '~/utils/image-scale-factor';
import { Product } from '~/types/swell.types';
import { observer } from 'mobx-react-lite';

type Props = {
  product: Product;
  width: string;
};

export const ProductImageField = observer(function ProductImageField({ product }: Props) {
  const image = product.images?.[0];
  const scaleFactor = imageHeightScaleFactor(image);

  const imageComponent = image?.file?.url ? (
    <Image
      src={image?.file?.url ?? ''}
      alt="Product Image"
      width={100}
      height={100 / scaleFactor}
    />
  ) : (
    <Stack width={100} height={100 / scaleFactor} />
  );

  return (
    <XStack width={'30%'} alignItems="center">
      {imageComponent}
      <BodyText bold paddingLeft="$2">
        {product.name}
      </BodyText>
    </XStack>
  );
});
