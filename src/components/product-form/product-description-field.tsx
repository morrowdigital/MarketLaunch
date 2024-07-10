import { observer } from 'mobx-react-lite';
import { YStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { RichTextEditor } from '~/components/rich-text-editor/rich-text-editor';

type Props = {
  product?: { description?: string };
  onChangeText: (text: string) => void;
};

export const ProductDescriptionField = observer(function ProductDescriptionField({
  product,
  onChangeText,
}: Props) {
  return (
    <YStack space="$2" paddingRight="$2">
      <BodyText bold>Product Description</BodyText>
      <RichTextEditor text={product?.description ?? ''} onChangeText={onChangeText} />
    </YStack>
  );
});
