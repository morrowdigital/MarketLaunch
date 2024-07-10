import { StripeLinkGuard } from './components/stripe-link-guard';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { XStack, YStack } from 'tamagui';
import { PageWrapper } from '~/components/wrapper';
import { PayoutsIcon } from '~/components/icons/icons';
import { PageHeader } from '~/components/page-header';
import { SearchBar } from '../orders/components/search-bar';
import { observer } from 'mobx-react-lite';
import { usePayoutsPresenter } from './payouts.presenter';
import { useEffect } from 'react';
import { FullSpinner } from '~/components/full-spinner';
import { PayoutsTable } from './components/payouts-table/payouts-table';
import { MultiSelectMenu } from '~/components/multi-select-menu/multi-select-menu';

export default observer(function PayoutsPage() {
  const { isReady, payouts, stripeAccountId, listStripePayouts, handleStatusMenuChange } =
    usePayoutsPresenter();

  useEffect(() => {
    if (stripeAccountId) {
      listStripePayouts(stripeAccountId, []);
    }
  }, [listStripePayouts, stripeAccountId]);

  return (
    <AuthenticationGuard allowedGroups={['vendors']}>
      <PageWrapper>
        <StripeLinkGuard>
          <YStack flex={1} space="$6">
            <PageHeader title="Payouts" left={<PayoutsIcon dark />} />

            <XStack>
              <SearchBar placeholder="Search payouts"></SearchBar>
              <MultiSelectMenu
                onOpenChange={handleStatusMenuChange}
                entries={[
                  ['paid', 'Paid'],
                  ['failed', 'Failed'],
                  ['pending', 'Pending'],
                  ['cancelled', 'Cancelled'],
                ]}
              />
            </XStack>

            {isReady ? <PayoutsTable payouts={payouts} /> : <FullSpinner />}
          </YStack>
        </StripeLinkGuard>
      </PageWrapper>
    </AuthenticationGuard>
  );
});
