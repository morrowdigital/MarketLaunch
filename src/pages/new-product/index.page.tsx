import { observer } from 'mobx-react-lite';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { YStack, H2 } from 'tamagui';
import { PageWrapper } from '~/components/wrapper';
import { PageHeader } from '~/components/page-header';
import { ProductForm } from '~/components/product-form/product-form';
import { useNewProductPresenter } from './new-product.presenter';
import { useEffect } from 'react';
import { useErrorToast, useToast } from '~/utils/use-toast';
import { useRouter } from 'next/router';
import { Routes } from '~/types/model';

export default observer(function ProductDetailsPage() {
  const {
    product,
    saveProductSuccess,
    setSaveProductSuccess,
    saveProductError,
    setSaveProductError,
  } = useNewProductPresenter();

  const router = useRouter();

  useEffect(() => {
    if (product && saveProductSuccess) {
      router.push(`/products/${product?.id}`);
      setSaveProductSuccess(false);
    }
  }, [setSaveProductSuccess, router, product, saveProductSuccess]);

  useToast({
    isVisible: saveProductSuccess,
    message: 'Product Saved successfully',
  });

  useErrorToast({
    error: saveProductError,
    message: saveProductError?.message ?? 'There was a problem saving your product',
    reset: () => {
      setSaveProductError(undefined);
    },
  });

  return (
    <AuthenticationGuard allowedGroups={['vendors']}>
      <PageWrapper>
        <PageHeader title={''} backTo={Routes.Products} />
        <YStack flex={1}>
          <H2>New Product</H2>
          <ProductForm />
        </YStack>
      </PageWrapper>
    </AuthenticationGuard>
  );
});
