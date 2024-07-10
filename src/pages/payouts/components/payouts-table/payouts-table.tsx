import { YStack } from 'tamagui';
import { Header } from '~/components/table-header';
import { PayoutsList } from './payouts-list';
import Stripe from 'stripe';

type Props = {
  payouts: Stripe.Payout[];
};

const titles = ['Date Due', 'Status', 'Gross Amount', 'Fees', 'Total'];
export function PayoutsTable({ payouts }: Props) {
  const width = `${100 / titles.length}%`;
  const titlesWithWidth = titles.map((title) => {
    return { name: title, width: width };
  });

  return (
    <YStack>
      <Header titles={titlesWithWidth} />
      <PayoutsList payouts={payouts} columnWidth={width} />
    </YStack>
  );
}
