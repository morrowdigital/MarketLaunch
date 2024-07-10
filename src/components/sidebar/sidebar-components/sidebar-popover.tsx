import { useSidebarPresenterContext } from '~/components/sidebar/sidebar';
import { Popover, YStack } from 'tamagui';
import { MoreHorizontal } from '@tamagui/lucide-icons';
import { CardInCard } from '~/components/card-in-card';
import { PopoverUserArea } from '~/components/sidebar/sidebar-components/popover-user-area';
import { observer } from 'mobx-react-lite';
import { useLogoutHandler } from '~/utils/useLogout';
import { SpinnerThemed } from '~/components/spinner-themed';
import { ElevatedCard } from '~/components/elevated-card';
import { LightButton } from '~/components/light-button';

export const SidebarPopover = observer(function SidebarPopover() {
  const { logout, isLoggingOut } = useSidebarPresenterContext();
  const onLogout = useLogoutHandler(logout);

  return (
    <Popover placement="top">
      <Popover.Trigger asChild>
        <LightButton>
          <MoreHorizontal />
        </LightButton>
      </Popover.Trigger>
      <Popover.Content padding={0}>
        <ElevatedCard width="100%" height="100%" space overflow="hidden">
          <YStack padding={20} paddingBottom={0} space>
            <LightButton justifyContent="flex-start" onPress={onLogout} disabled={isLoggingOut}>
              Logout {isLoggingOut && <SpinnerThemed />}
            </LightButton>
          </YStack>
          <CardInCard padding={20}>
            <PopoverUserArea />
          </CardInCard>
        </ElevatedCard>
      </Popover.Content>
    </Popover>
  );
});
