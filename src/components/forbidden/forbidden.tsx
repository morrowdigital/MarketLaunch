import { XStack, YStack, H1, H2 } from 'tamagui';
import { DarkButton } from '~/components/dark-button';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { ForbiddenPresenter } from '~/components/forbidden/forbidden.presenter';
import { useLogoutHandler } from '~/utils/useLogout';
import { SpinnerThemed } from '~/components/spinner-themed';
import { useEffect } from 'react';
import { Routes } from '~/types/model';

export const Forbidden = observer(function Forbidden() {
  const router = useRouter();
  const { logout, isLoggingOut } = useForbiddenPresenter();

  useEffect(() => {
    router.prefetch(Routes.Root);
  }, [router]);

  const goHome = () => {
    router.push('/').then();
  };

  const onLogout = useLogoutHandler(logout);

  return (
    <YStack width="100%" height="100%" alignItems="center" justifyContent="center" space>
      <H1>Forbidden</H1>
      <H2>You should not be here...</H2>
      <XStack space>
        <DarkButton onPress={goHome}>Go back to the Home Page</DarkButton>
        <XStack alignItems="center" space>
          <DarkButton onPress={onLogout} disabled={isLoggingOut}>
            Logout
          </DarkButton>
          {isLoggingOut && <SpinnerThemed />}
        </XStack>
      </XStack>
    </YStack>
  );
});

const useForbiddenPresenter = () =>
  useDependency<ForbiddenPresenter>(Symbol.for(Injectables.ForbiddenPresenter));
