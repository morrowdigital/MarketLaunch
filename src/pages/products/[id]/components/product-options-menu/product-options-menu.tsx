import { ConfirmationDialog } from '~/components/confirmation-dialog/confirmation-dialog';
import { MenuButton } from '~/components/menu-button';
import { useProductDetailPresenter } from '../../product-detail.presenter';
import { useErrorToast, useToast } from '~/utils/use-toast';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { ActionMenu } from '~/components/action-menu';

export const ProductOptionsMenu = observer(function ProductOptionsMenu() {
  const router = useRouter();
  const {
    isDeletingProduct,
    deleteProduct,
    deletionError,
    resetDeletionError,
    deletionSuccess,
    setDeletionSuccess,
  } = useProductDetailPresenter();

  useErrorToast({
    error: deletionError,
    message: 'There was a problem deleting your product',
    reset: resetDeletionError,
  });

  useToast({
    isVisible: deletionSuccess,
    message: 'Product deleted successfully',
    reset: () => {
      setDeletionSuccess(false);
      router.replace('/products');
    },
  });

  return (
    <ActionMenu triggerText="Options" shouldShowSpinner={isDeletingProduct}>
      <ConfirmationDialog
        onConfirm={deleteProduct}
        title={'Delete Product?'}
        prompt="Would you like to delete this product?"
      >
        <MenuButton backgroundColor={'$red10'} hoverStyle={{ backgroundColor: '$red8' }}>
          Delete
        </MenuButton>
      </ConfirmationDialog>
    </ActionMenu>
  );
});
