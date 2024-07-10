import { IconLabel } from '~/components/icon-label';
import { ClientInfoCard } from './client-info-card';
import { H2 } from 'tamagui';
import { PersonIcon } from '~/components/icons/icons';
import { Order } from '~/types/api.types';
import { observer } from 'mobx-react-lite';

type Props = {
  order: Order;
};

export const NameSection = observer(function NameSection({ order }: Props) {
  return (
    <ClientInfoCard>
      <IconLabel icon={<PersonIcon dark />} label="Client Information" labelColor="white" />

      <H2 color={'white'}>
        {order.account?.firstName} {order.account?.lastName}
      </H2>
    </ClientInfoCard>
  );
});
