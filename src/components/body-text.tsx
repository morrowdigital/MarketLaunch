import { SizableText, styled } from 'tamagui';

export const BodyText = styled(SizableText, {
  fontFamily: '$body',
  size: '$7',
  variants: {
    bold: {
      true: {
        fontWeight: '700',
      },
    },
    small: {
      true: {
        fontSize: '$4',
      },
    },
  } as const,
});
