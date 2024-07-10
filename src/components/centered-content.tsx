import { styled, YStack } from 'tamagui';

export const CenteredContent = styled(YStack, {
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  // @ts-expect-error TODO: Explain
  overflow: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
});
