import { AlertDialog, YStack, XStack } from 'tamagui';
import { LightButton } from '../light-button';
import { DarkButton } from '../dark-button';

type Props = {
  title: string;
  prompt: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmationDialog({ prompt, title, children, onCancel, onConfirm }: Props) {
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild="except-style">{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>{prompt}</AlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild onPress={onCancel}>
                <LightButton>No</LightButton>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onPress={onConfirm}>
                <DarkButton>Yes</DarkButton>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
