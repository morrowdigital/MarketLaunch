import { Dialog, Separator, XStack } from 'tamagui';
import { DialogCloseButton } from './close-button';
import { Spacer } from '~/components/spacer';

type Props = {
  children: string;
  onClose: () => void;
};

export function DialogTitle({ children, onClose }: Props) {
  return (
    <>
      <XStack justifyContent="center">
        <Dialog.Title>{children}</Dialog.Title>
        <Spacer />
        <DialogCloseButton onPress={onClose} />
      </XStack>
      <Separator borderColor="$colorA" marginVertical={10} />
    </>
  );
}
