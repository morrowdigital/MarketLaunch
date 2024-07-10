import { Stack } from 'tamagui';
import { BodyText } from '~/components/body-text';

type Props = {
  amount: number;
  width: string;
  currencySymbol?: string;
};

export function CurrencyField({ amount, width, currencySymbol = '$' }: Props) {
  return (
    <Stack width={width} justifyContent="center">
      <BodyText>
        {currencySymbol}
        {amount.toFixed(2)}
      </BodyText>
    </Stack>
  );
}
