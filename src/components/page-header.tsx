import { XStack, Square, H1 } from 'tamagui';
import { BackButton } from '~/components/back-button';
import { Spacer } from './spacer';
import { Routes } from '~/types/model';

type Props = {
  title: string;
  backTo?: Routes;
  left?: React.ReactElement;
  right?: React.ReactElement;
};

export const PageHeader = function ({ title, left, right, backTo }: Props) {
  return (
    <XStack alignItems="center" space="$2">
      {backTo ? <BackButton returnTo={backTo} /> : null}
      {left ? (
        <Square backgroundColor={'$colorA'} size={'$4'} borderRadius={'$5'}>
          {left}
        </Square>
      ) : null}
      <H1>{title}</H1>
      <Spacer />
      {right}
    </XStack>
  );
};
