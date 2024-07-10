import { EnvelopeIcon, PhoneIcon } from '~/components/icons/icons';
import { ClientInfoCard } from './client-info-card';
import { IconLabel } from '~/components/icon-label';
import { Order } from '~/types/api.types';
import { observer } from 'mobx-react-lite';

type Props = {
  order: Order;
};

export const ContactSection = observer(function ContactSection({ order }: Props) {
  return (
    <ClientInfoCard>
      <IconLabel icon={<EnvelopeIcon dark />} label={order.account?.email} labelColor="white" />
      <IconLabel icon={<PhoneIcon dark />} label={order.account?.phone} labelColor="white" />
    </ClientInfoCard>
  );
});
