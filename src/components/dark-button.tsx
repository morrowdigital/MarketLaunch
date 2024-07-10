import { Button, styled } from 'tamagui';

const UnstyledButton = styled(Button, {
  unstyled: true,
});

export const DarkButton = styled(UnstyledButton, {
  backgroundColor: '$colorA',
  color: 'white',
  fontSize: '$7',
  fontWeight: '700',
  borderRadius: 42,
  paddingVertical: '$1',
  paddingHorizontal: '$4',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
  variants: {
    disabled: {
      true: {
        backgroundColor: '$gray10',
      },
    },
    light: {
      true: {
        fontWeight: '400',
      },
    },
    square: {
      true: {
        borderRadius: '$2',
        paddingHorizontal: '$2',
      },
    },
    red: {
      true: {
        backgroundColor: '$red10',
      },
    },
  } as const,
});
