import { InlineLink } from '../inline-link';
import { Dialog, YStack } from 'tamagui';
import { useState } from 'react';
import { TermsContentItem } from '~/types/model';
import { DialogContent } from '~/components/dialog/content';
import { TermsContentElement } from '~/components/terms-modal/components/content';
import { DialogTitle } from '../dialog/title';
import { DialogDescription } from '../dialog/description';

type Props = {
  triggerText: string;
  title: string;
  content: TermsContentItem[];
};

export function TermsModal({ triggerText, title, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <InlineLink href="" onClick={toggle} color="black">
        {triggerText}
      </InlineLink>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay backgroundColor="$colorA" />
          <DialogContent>
            <DialogTitle onClose={close}>{title}</DialogTitle>
            <DialogDescription>Read and agree to our Terms and Conditions</DialogDescription>
            <YStack>
              {content.map((item) => (
                <TermsContentElement key={item.title} item={item} />
              ))}
            </YStack>
          </DialogContent>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
