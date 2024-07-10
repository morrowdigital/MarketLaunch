import { styled, Button } from 'tamagui';

const UnstyledButton = styled(Button, {
  unstyled: true,
});

export const MenuButton = styled(UnstyledButton, {
  backgroundColor: '$colorC',
  padding: 0,
  paddingVertical: '$2',
  paddingHorizontal: '$2',
  margin: 0,
  width: '100%',
  borderWidth: 0,
  borderRadius: '$4',
  justifyContent: 'center',
  color: 'white',
  hoverStyle: {
    backgroundColor: '$colorA',
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: '$gray10',
        hoverStyle: {
          cursor: 'default',
          backgroundColor: '$gray10',
        },
      },
    },
  },
});
