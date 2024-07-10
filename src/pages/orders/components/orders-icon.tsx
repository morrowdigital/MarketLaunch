import { NavIcons } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-icons';
import { NavListItemIcon } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-list-item-icon';

export function OrdersIcon() {
  return <NavListItemIcon icon={NavIcons.Orders} dark={true} scale={2} />;
}
