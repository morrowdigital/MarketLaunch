import { X } from '@tamagui/lucide-icons';
import { Dialog } from 'tamagui';

export function DialogCloseButton(props: { onPress: () => void }) {
  return (
    <Dialog.Close
      cursor="pointer"
      width={24}
      height={24}
      borderRadius={24}
      onPress={props.onPress}
      backgroundColor="$colorA"
      alignItems="center"
      justifyContent="center"
    >
      <X width={22} height={22} color="white" />
    </Dialog.Close>
  );
}
