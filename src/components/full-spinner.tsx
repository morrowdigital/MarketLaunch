import { YStack } from 'tamagui';
import { SpinnerThemed } from './spinner-themed';

export function FullSpinner() {
  return (
    <YStack fullscreen alignItems="center" justifyContent="center">
      <SpinnerThemed size="large" />
    </YStack>
  );
}
