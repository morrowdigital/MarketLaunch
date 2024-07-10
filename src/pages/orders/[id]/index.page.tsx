import { observer } from 'mobx-react-lite';
import { useOrderDetailPresenter } from './order-detail.presenter';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BuyerActionMenu } from '~/pages/buyer-orders/[id]/components/action-menu';
import { VendorActionMenu } from '~/pages/vendor-orders/[id]/components/action-menu';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { PageWrapper } from '~/components/wrapper';
import { FullSpinner } from '~/components/full-spinner';
import { DisplayMessage } from '~/components/display-message';
import { PageHeader } from '~/components/page-header';
import { NavListItemIcon } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-list-item-icon';
import { NavIcons } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-icons';
import { XStack, YStack } from 'tamagui';
import { TopRow } from './components/top-row';
import { OrderDetailTable } from './components/order-detail-table/order-detail-table';
import { ClientInfo } from './components/client-info/client-info';
import { Routes } from '~/types/model';

export default observer(function OrdersDetailsPage() {
  const { account, loadOrder, isReady, order, loadError, isPrinting, setIsPrinting } =
    useOrderDetailPresenter();
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;

    if (id) {
      loadOrder({ orderId: id as string });
    }
  }, [loadOrder, router.query, router.isReady]);

  let actionMenu;
  if (account?.group === 'buyers') {
    actionMenu = <BuyerActionMenu disabled={order?.delivered} />;
  } else if (account?.group === 'vendors') {
    actionMenu = <VendorActionMenu hidden={isPrinting} setIsPrinting={setIsPrinting} />;
  }

  let pageTitle;
  if (order?.number && isReady) {
    pageTitle = 'Order ' + order.number;
  } else {
    pageTitle = 'Loading order...';
  }

  return (
    <AuthenticationGuard allowedGroups={['vendors', 'buyers']}>
      <PageWrapper id="print">
        <PageHeader
          title={pageTitle}
          left={<NavListItemIcon icon={NavIcons.Orders} dark scale={2} />}
          right={actionMenu}
          backTo={isPrinting ? undefined : Routes.Orders}
        />

        {order && isReady && !loadError ? (
          <XStack justifyContent="space-between" alignItems="flex-start">
            <YStack flex={1} space="$4">
              <TopRow order={order!} />
              <OrderDetailTable order={order!} hideItemImage={isPrinting} />
            </YStack>
            <ClientInfo order={order} />
          </XStack>
        ) : (
          <FullSpinner />
        )}
        {loadError ? <DisplayMessage message="Order not loaded" /> : null}
      </PageWrapper>
    </AuthenticationGuard>
  );
});
