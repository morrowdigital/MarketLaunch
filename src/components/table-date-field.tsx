import { XStack } from 'tamagui';
import { format } from 'date-fns';
import { appConfig } from '~/app-config/app-config';
import { BodyText } from './body-text';

type Props = {
  date: string | number;
  width: string;
};

export function DateField({ date, width }: Props) {
  const dateFmt = format(new Date(date), appConfig.dateFormat);
  return (
    <XStack width={width} alignItems="center">
      <BodyText>{dateFmt}</BodyText>
    </XStack>
  );
}
