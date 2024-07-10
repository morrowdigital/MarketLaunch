import { ReactNode } from 'react';
import { XStack, YStack } from 'tamagui';
import { Sidebar } from '~/components/sidebar/sidebar';

type Props = {
  children: ReactNode;
};
export function SidebarLayout({ children }: Props) {
  return (
    <XStack>
      <Sidebar />
      <YStack flex={1} minHeight="100vh">
        {children}
      </YStack>
    </XStack>
  );
}
