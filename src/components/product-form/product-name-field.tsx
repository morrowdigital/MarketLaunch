import { YStack, Input } from 'tamagui';
import { BodyText } from '~/components/body-text';

type Props = {
  productName?: string;
  onChangeText: (text: string) => void;
};

export function ProductNameField({ productName, onChangeText }: Props) {
  return (
    <YStack space="$2" paddingRight="$2">
      <BodyText bold>Product Name</BodyText>
      <Input
        backgroundColor={'$gray2'}
        value={productName || ''}
        color="$blue5Dark"
        onChangeText={onChangeText}
      ></Input>
    </YStack>
  );
}
