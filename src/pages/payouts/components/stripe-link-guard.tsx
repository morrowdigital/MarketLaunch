import { observer } from 'mobx-react-lite';
import { Spinner } from 'tamagui';
import { useStripeLinkGuardPresenter } from './stripe-link-guard.presenter';
import { useEffect } from 'react';
import { DarkButton } from '~/components/dark-button';
import { useRouter } from 'next/router';
import { YStack } from 'tamagui';
import { PageHeader } from '~/components/page-header';
import { PayoutsIcon } from '~/components/icons/icons';

type Props = {
  children: JSX.Element;
};

export const StripeLinkGuard = observer(function StripeLinkGuard({ children }: Props) {
  const { stripeAccountLink, needsToCompleteSetup, isLoadingStripeAccountLink, cleanup } =
    useStripeLinkGuardPresenter();

  const router = useRouter();

  useEffect(() => cleanup, [cleanup]);

  const handleStripeAccountLinkClick = () => {
    router.push(stripeAccountLink);
  };

  if (!needsToCompleteSetup && !isLoadingStripeAccountLink) {
    return <>{children}</>;
  }

  if (stripeAccountLink) {
    return (
      <YStack space>
        <PageHeader title="Payouts" left={<PayoutsIcon dark />} />
        <DarkButton maxWidth={300} onPress={handleStripeAccountLinkClick}>
          Complete Payment Setup
        </DarkButton>
      </YStack>
    );
  }

  return <Spinner />;
});
