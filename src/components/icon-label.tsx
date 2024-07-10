import { XStack } from 'tamagui';
import { BodyText } from './body-text';

type Props = {
  icon: JSX.Element;
  label?: string;
  labelColor?: string;
};
export function IconLabel({ icon, label, labelColor }: Props) {
  return (
    <XStack space="$2" alignItems="center">
      {icon}
      <BodyText color={labelColor}>{label}</BodyText>
    </XStack>
  );
}
