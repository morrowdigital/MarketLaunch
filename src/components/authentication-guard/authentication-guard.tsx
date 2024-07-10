import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { isBrowser } from '~/utils/is-web';
import { useAuthenticationGuardPresenter } from './authentication-guard-presenter';
import { Group } from '~/types/api.types';
import { Forbidden } from '~/components/forbidden/forbidden';
import { SidebarLayout } from '~/components/sidebar-layout';
import { FullSpinner } from '~/components/full-spinner';
import { Routes } from '~/types/model';

type Props = { children: ReactNode; allowedGroups: Group[] };

export const AuthenticationGuard = observer(function AuthenticationGuard({
  children,
  allowedGroups,
}: Props): JSX.Element {
  const router = useRouter();
  const { status } = useAuthenticationGuardPresenter(allowedGroups);

  if (status === 'loading') {
    return <FullSpinner />;
  }

  if (status === 'unauthenticated') {
    // Do not redirect on server side
    isBrowser() &&
      router
        .push({
          pathname: Routes.Login,
          query: { redirect: router.asPath },
        })
        .then();
    return <></>;
  }

  if (status === 'forbidden') {
    return (
      <SidebarLayout>
        <Forbidden />
      </SidebarLayout>
    );
  }

  return <SidebarLayout>{children}</SidebarLayout>;
});
