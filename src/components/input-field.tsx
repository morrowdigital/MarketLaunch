import { ComponentProps } from 'react';
import { YStack, Input } from 'tamagui';
import { BodyText } from './body-text';
type Props = ComponentProps<typeof YStack> & {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
};
export function InputField({ label, value, onChangeText, ...props }: Props) {
  return (
    <YStack space={'$2'} {...props}>
      <BodyText bold>{label}</BodyText>
      <Input value={value} onChangeText={onChangeText} backgroundColor={'$gray2'} size="$2" />
    </YStack>
  );
}
