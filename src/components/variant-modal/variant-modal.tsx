import { Dialog, XStack } from 'tamagui';
import { useState } from 'react';
import { DialogOverlay } from '~/components/dialog/overlay';
import { DialogContent } from '~/components/dialog/content';
import { DarkButton } from '../dark-button';
import { VariantForm } from './variant-form';
import { ProductOption } from 'swell-js';
import {
  ProductFormPresenterContext,
  useProductFormPresenterContext,
} from '../product-form/product-form.presenter';
import { DialogTitle } from '../dialog/title';
import { DialogDescription } from '../dialog/description';

type Props = {
  option?: ProductOption;
  deleteOption?: (option: ProductOption) => void;
};

export function VariantModal({ option, deleteOption }: Props) {
  const productFormPresenter = useProductFormPresenterContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const edit = option !== undefined;

  return (
    <>
      <XStack space="$1">
        <DarkButton square onPress={toggle}>
          {edit ? 'Edit' : 'Add Variant'}
        </DarkButton>
        {edit && deleteOption && (
          <DarkButton red square onPress={() => deleteOption(option)}>
            Delete
          </DarkButton>
        )}
      </XStack>
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
            <DialogTitle onClose={close}>{edit ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
            <DialogDescription>Add/Edit Product Variant information here.</DialogDescription>
            <ProductFormPresenterContext.Provider value={productFormPresenter}>
              <VariantForm option={option} onSave={close} />
            </ProductFormPresenterContext.Provider>
          </DialogContent>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
