import { XStack } from 'tamagui';
import { Avatar } from '~/components/avatar';
import { observer } from 'mobx-react-lite';
import { useSidebarPresenterContext } from '../sidebar';
import { SidebarPopover } from '~/components/sidebar/sidebar-components/sidebar-popover';
import { BodyText } from '~/components/body-text';

export const SideBarUserArea = observer(function SideBarUserArea() {
  const { account } = useSidebarPresenterContext();

  return (
    <XStack alignItems="center" paddingHorizontal={21} paddingVertical={16}>
      <Avatar imageUrl={account?.content?.vendorLogo} name={account?.name} />
      <BodyText bold marginLeft={5} flex={1}>
        {account?.name}
      </BodyText>
      <SidebarPopover />
    </XStack>
  );
});
