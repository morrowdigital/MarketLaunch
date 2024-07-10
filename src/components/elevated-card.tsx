import { styled, YStack } from 'tamagui';

export const ElevatedCard = styled(YStack, {
  backgroundColor: '$pageBgDark',
  elevation: 50,
  shadowColor: 'rgba(0,0,0,0.1)',
  borderRadius: 10,
  variants: {
    bordered: {
      true: { borderColor: '$faint', borderWidth: 0.8, borderStyle: 'solid' },
    },
  } as const,
});
