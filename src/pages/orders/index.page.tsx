import { observer } from 'mobx-react-lite';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { XStack, YStack } from 'tamagui';
import { Tabbar } from '~/components/tabbar/tabbar';
import { Pagination } from './components/pagination';
import { SearchBar } from './components/search-bar';
import { FullSpinner } from '~/components/full-spinner';
import { PageWrapper } from '../../components/wrapper';
import { OrdersIcon } from './components/orders-icon';
import { DisplayMessage } from '~/components/display-message';
import { PageHeader } from '~/components/page-header';
import { OrderTable } from './components/order-table/order-table';
import { useOrdersPresenter } from './orders.presenter';

export default observer(function OrdersPage() {
  const {
    account,
    orders,
    isReady,
    currentPage,
    pageCount,
    nextPage,
    previousPage,
    setTabFilter,
    tabs,
    loadError,
    onSearchTermUpdate,
    searchTerm,
    onDebounce,
  } = useOrdersPresenter();

  return (
    <AuthenticationGuard allowedGroups={['vendors', 'buyers']}>
      <PageWrapper>
        <YStack flex={1} space="$6">
          <PageHeader title="Orders" left={<OrdersIcon />} />
          <Tabbar onTabSelected={setTabFilter} tabs={tabs} />

          <XStack>
            <SearchBar
              onChangeText={onSearchTermUpdate}
              value={searchTerm}
              onDebounce={onDebounce}
            />
          </XStack>

          {isReady ? <OrderTable orders={orders} account={account!} /> : <FullSpinner />}
          {loadError ? <DisplayMessage message="Orders not loaded" /> : null}
          <Pagination
            onPrevious={previousPage}
            onNext={nextPage}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </YStack>
      </PageWrapper>
    </AuthenticationGuard>
  );
});
