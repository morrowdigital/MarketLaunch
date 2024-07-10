import { XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { ChevronButtonLeft, ChevronButtonRight } from '~/components/chevron-button';

type Props = {
  onPrevious: () => void;
  onNext: () => void;
  currentPage: number;
  pageCount: number;
};

export function Pagination({ onPrevious, onNext, currentPage, pageCount }: Props) {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < pageCount;

  return (
    <XStack alignItems="center" space="$2" alignSelf="center" paddingBottom="$4">
      <ChevronButtonLeft onPress={onPrevious} disabled={!canGoBack}></ChevronButtonLeft>
      <BodyText>
        {currentPage} of {pageCount}
      </BodyText>
      <ChevronButtonRight onPress={onNext} disabled={!canGoForward}></ChevronButtonRight>
    </XStack>
  );
}
