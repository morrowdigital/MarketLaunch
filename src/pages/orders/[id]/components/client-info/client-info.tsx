import { YStack } from 'tamagui';
import { BodyText } from '~/components/body-text';

import { ClientInfoCard } from './client-info-card';
import { BillIcon, PinIcon } from '~/components/icons/icons';
import { IconLabel } from '~/components/icon-label';
import { NameSection } from './name-section';
import { ContactSection } from './contact-section';
import { Order } from '~/types/api.types';
import { observer } from 'mobx-react-lite';

type Props = { order: Order };

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack
      marginLeft={40}
      backgroundColor={'$colorA'}
      paddingVertical="$3"
      paddingHorizontal="$4"
      borderRadius="$6"
      space="$4"
      maxWidth={250}
    >
      {children}
    </YStack>
  );
};

export const ClientInfo = observer(function ClientInfo({ order }: Props) {
  const shippingAddress = order.shipping?.address1 + ', ' + order.shipping?.address2;
  const billingAddress = order.billing?.address1 + ', ' + order.billing?.address2;

  return (
    <Wrapper>
      <NameSection order={order} />
      <ContactSection order={order} />

      <ClientInfoCard>
        <BodyText bold color="white">
          Shipping Address
        </BodyText>

        <IconLabel icon={<PinIcon dark />} label={shippingAddress} labelColor="white" />
      </ClientInfoCard>

      <ClientInfoCard>
        <BodyText bold color="white">
          Billing Address
        </BodyText>

        <IconLabel icon={<BillIcon dark />} label={billingAddress} labelColor="white" />
      </ClientInfoCard>
    </Wrapper>
  );
});
