import { XStack } from 'tamagui';
import { observer } from 'mobx-react-lite';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { TabbarPresenter } from './tabbar.presenter';
import { LightButton } from '~/components/light-button';

export type TabbarTab = {
  index: number;
  title: string;
};

type Props = {
  tabs: TabbarTab[];
  onTabSelected: (tab: TabbarTab) => void;
};

export const Tabbar = observer(function Tabbar({ tabs, onTabSelected }: Props) {
  const { handleTabSelection, selectedTabIndex } = useTabbarPresenter();

  return (
    <XStack space="$2" borderBottomWidth={1} borderBottomColor={'colorB'}>
      {tabs.map((tab) => (
        <LightButton
          onPress={handleTabSelection(tab, onTabSelected)}
          key={tab.index}
          borderBottomWidth={tab.index === selectedTabIndex ? 2 : 0}
          borderBottomColor="$colorA"
          fontWeight={tab.index === selectedTabIndex ? 'bold' : 'normal'}
          padding="$3"
        >
          {tab.title}
        </LightButton>
      ))}
    </XStack>
  );
});

export const useTabbarPresenter = () =>
  useDependency<TabbarPresenter>(Symbol.for(Injectables.TabbarPresenter));
