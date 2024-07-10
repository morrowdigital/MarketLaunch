import { XStack } from 'tamagui';
import { BodyText } from './body-text';

type Props = {
  message: string;
};

export function DisplayMessage({ message }: Props) {
  return (
    <XStack justifyContent="center">
      <BodyText>{message}</BodyText>
    </XStack>
  );
}
