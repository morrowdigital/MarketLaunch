import { observer } from 'mobx-react-lite';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { XStack, YStack } from 'tamagui';
import { PageWrapper } from '~/components/wrapper';
import { DisplayMessage } from '~/components/display-message';
import { SearchBar } from '../orders/components/search-bar';
import { Pagination } from '../orders/components/pagination';
import { FullSpinner } from '~/components/full-spinner';
import { useProductsPresenter } from './products.presenter';
import { ProductsTable } from './components/products-table/products-table';
import { PageHeader } from '~/components/page-header';
import { DarkButton } from '~/components/dark-button';
import { ProductIcon } from '~/components/icons/icons';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MultiSelectMenu } from '~/components/multi-select-menu/multi-select-menu';
import { productStates } from '~/utils/product-states';
import { Routes } from '~/types/model';

function NewProductButton({ shouldPreload }: { shouldPreload: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (shouldPreload) {
      router.prefetch(Routes.NewProduct);
    }
  }, [router, shouldPreload]);

  const navigateToNewProductPage = () => {
    router.push(Routes.NewProduct);
  };

  return (
    <DarkButton paddingVertical="$3" onPress={navigateToNewProductPage}>
      New Product
    </DarkButton>
  );
}

export default observer(function VendorProductsPage() {
  const {
    currentPage,
    previousPage,
    nextPage,
    pageCount,
    loadError,
    products,
    isReady,
    loadProducts,
    handleStatusMenuChange,
    handleSearchTermChange,
    noSearchResults,
  } = useProductsPresenter();

  useEffect(loadProducts, [loadProducts]);

  return (
    <AuthenticationGuard allowedGroups={['vendors']}>
      <PageWrapper>
        <YStack flex={1} space="$6">
          <PageHeader
            title="Products"
            left={<ProductIcon dark />}
            right={<NewProductButton shouldPreload={products.length === 0} />}
          />

          <XStack>
            <SearchBar onChangeText={handleSearchTermChange} placeholder="Search Products" />
            <MultiSelectMenu
              entries={Object.entries(productStates)}
              onOpenChange={handleStatusMenuChange}
            />
          </XStack>

          {isReady ? <ProductsTable products={products} /> : <FullSpinner />}
          {loadError ? <DisplayMessage message="Products not loaded" /> : null}
          {noSearchResults ? <DisplayMessage message="Items not found" /> : null}
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
