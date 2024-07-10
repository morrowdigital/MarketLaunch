import { observer } from 'mobx-react-lite';
import { ConfirmationDialog } from '~/components/confirmation-dialog/confirmation-dialog';
import { ActionMenu } from '~/components/action-menu';
import { useBuyerActionMenuPresenter } from './action-menu.presenter';
import { useErrorToast } from '~/utils/use-toast';
import { MenuButton } from '~/components/menu-button';

type Props = {
  disabled?: boolean;
};

export const BuyerActionMenu = observer(function BuyerActionMenu({ disabled }: Props) {
  const { cancelOrder, isCancellingOrder, cancelError, resetCancelError } =
    useBuyerActionMenuPresenter();

  useErrorToast({
    error: cancelError,
    message: 'There was a problem cancelling your order',
    reset: resetCancelError,
  });

  return (
    <>
      <ActionMenu disabled={disabled} shouldShowSpinner={isCancellingOrder}>
        <ConfirmationDialog
          title={'Cancel Order?'}
          prompt="Would you like to cancel this order?"
          onConfirm={cancelOrder}
        >
          <MenuButton disabled={disabled}>Cancel Order</MenuButton>
        </ConfirmationDialog>
      </ActionMenu>
    </>
  );
});
