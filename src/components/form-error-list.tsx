import { YStack } from 'tamagui';
import { BodyText } from './body-text';

type Props = {
  errors?: string[];
};

export function FormErrorList({ errors }: Props) {
  const hasErrors = errors?.length;
  return (
    <YStack paddingVertical={hasErrors ? '$2' : '$0'}>
      {errors?.map((error, index) => (
        <BodyText key={index} color="$red10">
          {error}
        </BodyText>
      ))}
    </YStack>
  );
}
