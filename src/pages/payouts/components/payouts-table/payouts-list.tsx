import { DateField } from '~/components/table-date-field';
import { TableRow } from '~/components/table-row';
import { PayoutStatusField } from './status-field';
import { CurrencyField } from './currency-field';
import Stripe from 'stripe';
import { observer } from 'mobx-react-lite';

type Props = {
  payouts: Stripe.Payout[];
  columnWidth: string;
};

export const PayoutsList = observer(function PayoutsList({ payouts, columnWidth }: Props) {
  const payoutRows = payouts.map((payout) => (
    <TableRow key={payout.id}>
      <DateField date={payout.arrival_date} width={columnWidth} />
      <PayoutStatusField payout={payout} width={columnWidth} />
      <CurrencyField width={columnWidth} amount={payout.amount} />
      <CurrencyField width={columnWidth} amount={0} />
      <CurrencyField width={columnWidth} amount={payout.amount} />
    </TableRow>
  ));

  return <>{payoutRows}</>;
});
