import { Dialog, styled } from 'tamagui';

export const DialogContent = styled(Dialog.Content, {
  width: '100%',
  maxWidth: 390,
  minHeight: 200,
  maxHeight: '100vh',
  // @ts-expect-error TODO
  overflow: 'auto',
});
