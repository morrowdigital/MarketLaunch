import { observer } from 'mobx-react-lite';
import { RootPagePresenter } from './index.presenter';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useRouter } from 'next/router';
import { FullSpinner } from '~/components/full-spinner';
import { useEffect } from 'react';
import { appConfig } from '~/app-config/app-config';
import { Routes } from '~/types/model';

export default observer(function HomePage() {
  const { account, isReady } = useHomePagePresenter();
  const router = useRouter();
  const group = account?.group;

  useEffect(() => {
    if (isReady) {
      if (!group) {
        router.push(Routes.Login).then();
        return;
      }

      const defaultRoute = appConfig.defaultRoutes[group];
      router.push(defaultRoute).then();
    } else {
      router.prefetch(Routes.Login);
    }
  }, [group, isReady, router]);

  return <FullSpinner />;
});

const useHomePagePresenter = () =>
  useDependency<RootPagePresenter>(Symbol.for(Injectables.HomePagePresenter));
