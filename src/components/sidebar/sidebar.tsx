import { observer } from 'mobx-react-lite';
import { styled, YStack } from 'tamagui';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { SidebarPresenter } from '~/components/sidebar/sidebar.presenter';
import { AppLogo } from '~/components/app-logo';
import { CardInCard } from '~/components/card-in-card';
import { SideBarUserArea } from '~/components/sidebar/sidebar-components/side-bar-user-area';
import { createContext, useContext } from 'react';
import { ElevatedCard } from '~/components/elevated-card';
import { SideNav } from './sidebar-components/side-nav/side-nav';

const Wrapper = styled(ElevatedCard, {
  alignItems: 'center',
  space: true,
  paddingTop: 29,
  borderTopRightRadius: 30,
  borderBottomRightRadius: 30,
  minWidth: 220,
  overflow: 'hidden',
  minHeight: '100vh',
});

export const Sidebar = observer(function Sidebar() {
  const sidebarPresenter = useSidebarPresenter();

  return (
    <SidebarPresenterContext.Provider value={sidebarPresenter}>
      <Wrapper>
        <YStack flex={1} paddingHorizontal={10} space={30}>
          <AppLogo width={200} height={35} />
          <SideNav />
        </YStack>
        <CardInCard>
          <SideBarUserArea />
        </CardInCard>
      </Wrapper>
    </SidebarPresenterContext.Provider>
  );
});

export const useSidebarPresenter = () =>
  useDependency<SidebarPresenter>(Symbol.for(Injectables.SidebarPresenter));

const SidebarPresenterContext = createContext<SidebarPresenter | null>(null);
export const useSidebarPresenterContext = () => {
  const context = useContext(SidebarPresenterContext);
  if (!context) {
    throw new Error(
      'useSidebarPresenterContext must be used within a SidebarPresenterContextProvider'
    );
  }
  return context;
};
