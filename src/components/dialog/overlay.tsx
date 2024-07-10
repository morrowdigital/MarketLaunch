import { Dialog, styled } from 'tamagui';

const UnstyledOverlay = styled(Dialog.Overlay, {});

export const DialogOverlay = styled(UnstyledOverlay, {
  backgroundColor: '$colorA',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
  animation: 'quick',
  key: 'overlay',
  opacity: 0.5,
});
