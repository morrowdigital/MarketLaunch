import { useSidebarPresenterContext } from '~/components/sidebar/sidebar';
import { XStack, YStack } from 'tamagui';
import { Avatar } from '~/components/avatar';
import { BodyText } from '~/components/body-text';
import { observer } from 'mobx-react-lite';

export const PopoverUserArea = observer(function PopoverUserArea() {
  const { account } = useSidebarPresenterContext();

  return (
    <>
      <XStack alignItems="center">
        <Avatar imageUrl={account?.content?.vendorLogo} name={account?.name} />
        <YStack>
          <BodyText bold marginLeft={5} flex={1}>
            {account?.name}
          </BodyText>
          <BodyText marginLeft={5} flex={1}>
            {account?.email}
          </BodyText>
        </YStack>
      </XStack>
    </>
  );
});
