import { observer } from 'mobx-react-lite';
import { ConfirmationDialog } from '~/components/confirmation-dialog/confirmation-dialog';
import { MenuButton } from '~/components/menu-button';
import { useErrorToast, useToast } from '~/utils/use-toast';
import { useReactToPrint } from 'react-to-print';
import { FulfilOrderModal } from '~/components/fulfil-order-modal/fulfil-order-modal';
import { useState } from 'react';
import { ActionMenu } from '~/components/action-menu';
import { useVendorActionMenuPresenter } from './action-menu.presenter';
import { VisuallyHidden } from '@tamagui/visually-hidden';

type Props = {
  hidden: boolean;
  setIsPrinting: (isPrinting: boolean) => void;
};

export const VendorActionMenu = observer(function VendorActionMenu({
  hidden,
  setIsPrinting,
}: Props) {
  const {
    cancelOrder,
    cancelError,
    resetCancelError,
    isCancellingOrder,
    isFulfillingOrder,
    fulfilOrderError,
    resetFulfilOrderError,
    orderFulfilledSuccess,
    setOrderFulfilledSuccess,
  } = useVendorActionMenuPresenter();

  useErrorToast({
    error: cancelError,
    message: 'There was a problem cancelling your order',
    reset: resetCancelError,
  });

  useErrorToast({
    error: fulfilOrderError,
    message: 'There was a problem fulfilling your order',
    reset: resetFulfilOrderError,
  });

  useToast({
    isVisible: orderFulfilledSuccess,
    message: 'Order fulfilled successfully',
    reset: () => {
      setOrderFulfilledSuccess(false);
      setShowFulfilOrderModal(false);
    },
  });

  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {
      setIsPrinting(true);
      // Without this, the print view fires too early and doesn't pick up the isPrinting changes.
      return new Promise((resolve) => resolve(undefined));
    },
    content: () => document.querySelector('#print'),
    onAfterPrint: () => setIsPrinting(false),
  });

  const [showFulfilOrderModal, setShowFulfilOrderModal] = useState(false);

  return (
    <VisuallyHidden visible={!hidden}>
      <FulfilOrderModal
        isOpen={showFulfilOrderModal}
        onClose={() => setShowFulfilOrderModal(false)}
      />
      <ActionMenu shouldShowSpinner={isCancellingOrder || isFulfillingOrder}>
        <VisuallyHidden visible={!hidden}>
          <ConfirmationDialog
            title={'Cancel Order?'}
            prompt="Would you like to cancel this order?"
            onConfirm={cancelOrder}
          >
            <MenuButton>Cancel Order</MenuButton>
          </ConfirmationDialog>

          <MenuButton onPress={() => setShowFulfilOrderModal(true)}>Fulfil Items</MenuButton>
          <MenuButton onPress={handlePrint}>Print Order</MenuButton>
        </VisuallyHidden>
      </ActionMenu>
    </VisuallyHidden>
  );
});
