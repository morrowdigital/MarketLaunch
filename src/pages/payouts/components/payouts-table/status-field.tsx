import { Stack } from 'tamagui';
import Stripe from 'stripe';
import { ColoredField } from '~/components/colored-field';
import { StripeStatus } from '~/types/api.types';

type Props = {
  payout: Stripe.Payout;
  width: string;
};

export function PayoutStatusField({ payout, width }: Props) {
  let bgColor;
  let textColor;
  switch (payout.status as StripeStatus) {
    case 'paid':
      bgColor = '$statusGreenBg';
      textColor = '$statusGreenFg';
      break;
    case 'pending':
      bgColor = '$statusOrangeBg';
      textColor = '$statusOrangeFg';
      break;
    case 'cancelled':
    case 'failed':
      bgColor = '$statusRedBg';
      textColor = '$statusRedFg';
      break;
  }

  return (
    <Stack width={width}>
      <ColoredField backgroundColor={bgColor} textColor={textColor} value={payout.status} />
    </Stack>
  );
}
