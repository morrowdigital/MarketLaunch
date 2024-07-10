import { observer } from 'mobx-react-lite';
import { Routes } from '~/types/model';
import { NavListItem } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/nav-list-item';
import { NavIcons } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-icons';
import { useSidebarPresenterContext } from '~/components/sidebar/sidebar';
import { useRouter } from 'next/router';
import { YStack } from 'tamagui';

type VendorRoute = { path: string; name: string; icon: NavIcons };

const routesPerRole = {
  buyers: [
    { path: Routes.Orders, name: 'Orders', icon: NavIcons.Orders },
    { path: Routes.Settings, name: 'Settings', icon: NavIcons.Settings },
  ],
  vendors: [
    { path: Routes.Orders, name: 'Orders', icon: NavIcons.Orders },
    { path: Routes.Products, name: 'Products', icon: NavIcons.Products },
    { path: Routes.Payouts, name: 'Payouts', icon: NavIcons.Payouts },
    { path: Routes.Settings, name: 'Settings', icon: NavIcons.Settings },
  ],
};

export const SideNav = observer(function SideNav() {
  const router = useRouter();
  const redirect = (pathname: string) => router.push(pathname);
  const isActive = (pathname: string) => router.pathname.startsWith(pathname);

  const { account } = useSidebarPresenterContext();

  let routes: VendorRoute[] = [];
  if (account?.group) {
    routes = routesPerRole[account!.group!];
  }

  return (
    <YStack space={4}>
      {routes.map((route) => (
        <NavListItem
          key={route.path}
          dark={isActive(route.path)}
          onPress={() => redirect(route.path)}
          label={route.name}
          icon={route.icon}
        />
      ))}
    </YStack>
  );
});
