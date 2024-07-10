import { Dialog } from 'tamagui';
import { useState } from 'react';
import { DialogContent } from '~/components/dialog/content';
import { DialogOverlay } from '~/components/dialog/overlay';
import { DialogTitle } from '~/components/dialog/title';
import { DarkButton } from '~/components/dark-button';
import { StockForm } from './stock-form';
import { Variant } from 'swell-js';
import {
  ProductFormPresenterContext,
  useProductFormPresenterContext,
} from '../product-form/product-form.presenter';
import { DialogDescription } from '../dialog/description';

type Props = {
  triggerText: string;
  disabled?: boolean;
  variant?: Variant;
  title: string;
};

export function StockModal({ triggerText, disabled, variant, title }: Props) {
  const presenter = useProductFormPresenterContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <DarkButton onPress={toggle} disabled={disabled} borderRadius={10} paddingHorizontal={10}>
        {triggerText}
      </DarkButton>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <DialogTitle onClose={close}>{title}</DialogTitle>
            <DialogDescription>Add/Edit Product Stock information here.</DialogDescription>
            <ProductFormPresenterContext.Provider value={presenter}>
              <StockForm onSave={close} variant={variant} />
            </ProductFormPresenterContext.Provider>
          </DialogContent>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
