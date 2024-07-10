import { Popover, Spinner } from 'tamagui';
import { DarkButton } from './dark-button';
import { ChevronUpIcon } from './icons/icons';

type Props = {
  disabled?: boolean;
  children: React.ReactNode;
  triggerText?: string;
  triggerIcon?: JSX.Element;
  shouldShowSpinner?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ActionMenu({
  disabled,
  children,
  triggerText,
  triggerIcon,
  shouldShowSpinner,
  onOpenChange,
}: Props) {
  return (
    <Popover onOpenChange={onOpenChange}>
      <Popover.Trigger disabled={disabled}>
        <DarkButton
          borderRadius="$4"
          disabled={disabled}
          flexDirection="row"
          alignItems="center"
          paddingVertical="$2.5"
          icon={shouldShowSpinner ? <Spinner /> : null}
          iconAfter={triggerIcon ?? <ChevronUpIcon dark />}
        >
          {triggerText ?? 'Action'}
        </DarkButton>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={0}
        backgroundColor={'$colorC'}
        padding={0}
        width={'100%'}
        enterStyle={{ x: 0, y: -10, opacity: 0 }}
        exitStyle={{ x: 0, y: -10, opacity: 0 }}
        opacity={1}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        elevate
      >
        {children}
        <Popover.Close />
      </Popover.Content>
    </Popover>
  );
}
