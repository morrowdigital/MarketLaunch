import { YStack, XStack, Stack, ScrollView } from 'tamagui';
import { BodyText } from '~/components/body-text';
import Image from 'next/image';
import { Pressable } from 'react-native';
import { ProductImagePicker } from '~/components/product-image-picker';
import { useProductFormPresenterContext } from '../product-form.presenter';
import { ProductImageCard } from './product-image-card';
import { observer } from 'mobx-react-lite';

export const ProductImages = observer(function ProductImages() {
  const { handleImageSelected, handleRemoveImage, heroImage, remainingImages } =
    useProductFormPresenterContext();

  return (
    <YStack space="$2" paddingRight="$2">
      <BodyText bold>Images</BodyText>
      <XStack backgroundColor={'$gray2'}>
        {heroImage ? (
          <ProductImageCard marginBottom="$2.5" onClose={() => handleRemoveImage(heroImage)}>
            <Image
              src={heroImage.file!.url!}
              alt={heroImage.caption || 'Product Hero Image'}
              width={200}
              height={200}
            />
          </ProductImageCard>
        ) : null}
        <ScrollView horizontal>
          <XStack>
            {remainingImages?.map(([first, second], index) => (
              <YStack key={index + first!.file!.url!}>
                <ProductImageCard onClose={() => handleRemoveImage(first!)}>
                  <Image
                    src={first!.file!.url!}
                    alt={first!.caption || 'Product Image'}
                    width={100}
                    height={100}
                  />
                </ProductImageCard>
                {second ? (
                  <ProductImageCard
                    marginBottom="$2.5"
                    position="relative"
                    onClose={() => handleRemoveImage(second)}
                  >
                    <Image
                      src={second.file!.url!}
                      alt={second.caption || 'Product Image'}
                      width={100}
                      height={100}
                    />
                  </ProductImageCard>
                ) : null}
              </YStack>
            ))}
          </XStack>
        </ScrollView>
        <Pressable>
          <Stack backgroundColor={'$gray2'} padding="$2">
            <ProductImagePicker onImagePicked={handleImageSelected} />
          </Stack>
        </Pressable>
      </XStack>
    </YStack>
  );
});
