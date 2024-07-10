import { observer } from 'mobx-react-lite';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { YStack, Stack, H2 } from 'tamagui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageWrapper } from '~/components/wrapper';
import { FullSpinner } from '~/components/full-spinner';
import { PageHeader } from '~/components/page-header';
import { useProductDetailPresenter } from './product-detail.presenter';
import { DisplayMessage } from '~/components/display-message';
import { ProductForm } from '~/components/product-form/product-form';
import { ProductOptionsMenu } from './components/product-options-menu/product-options-menu';
import { useErrorToast, useToast } from '~/utils/use-toast';
import { Routes } from '~/types/model';

export const RightElement = () => (
  <Stack>
    <ProductOptionsMenu />
  </Stack>
);

export default observer(function ProductDetailsPage() {
  const {
    loadProduct,
    product,
    loadError,
    saveProductError,
    setSaveProductError,
    saveProductSuccess,
    setSaveProductSuccess,
    onCleanUp,
  } = useProductDetailPresenter();
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;

    if (id) {
      loadProduct({ productId: id as string });
    }
  }, [loadProduct, router.query, router.isReady]);

  useEffect(() => {
    return onCleanUp;
  }, [onCleanUp]);

  useErrorToast({
    error: saveProductError,
    message: 'There was a problem updating this product',
    reset: () => setSaveProductError(undefined),
  });

  useToast({
    isVisible: saveProductSuccess,
    message: 'Product updated successfully',
    reset: () => {
      setSaveProductSuccess(false);
    },
  });

  return (
    <AuthenticationGuard allowedGroups={['vendors']}>
      <PageWrapper>
        <PageHeader title={''} backTo={Routes.Products} right={<RightElement />} />
        {product && !loadError ? (
          <YStack flex={1}>
            <H2>Details</H2>
            <ProductForm product={product} />
          </YStack>
        ) : (
          <FullSpinner />
        )}
        {loadError ? <DisplayMessage message="Product not loaded" /> : null}
      </PageWrapper>
    </AuthenticationGuard>
  );
});
