import { Dialog } from 'tamagui';
import { useEffect } from 'react';
import { DialogContent } from '~/components/dialog/content';
import { FulfilOrderForm } from './fulfil-order-form';
import { observer } from 'mobx-react-lite';
import { useFulfilOrderModalPresenter } from './fulfil-order-modal.presenter';
import { DialogOverlay } from '../dialog/overlay';
import { DialogTitle } from '../dialog/title';
import { DialogDescription } from '../dialog/description';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const FulfilOrderModal = observer(function FulfilOrderModal({
  isOpen: defaultOpen,
  onClose,
}: Props) {
  const { isOpen, setIsOpen, close, handleOpenChange } = useFulfilOrderModalPresenter();

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [setIsOpen, defaultOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => handleOpenChange(open, onClose)}>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          >
            <DialogTitle onClose={close}>Order Fulfilment</DialogTitle>
            <DialogDescription>Fill in fulfilment information for the order.</DialogDescription>
            <FulfilOrderForm />
          </DialogContent>
        </Dialog.Portal>
      </Dialog>
    </>
  );
});
