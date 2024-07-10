import { Dialog, VisuallyHidden } from 'tamagui';

export function DialogDescription({ children }: { children: string }) {
  return (
    <VisuallyHidden>
      <Dialog.Description>{children}</Dialog.Description>
    </VisuallyHidden>
  );
}
