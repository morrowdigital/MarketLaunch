import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { StripeAccountStore } from '~/state/stripe-account.store';
import { StripeStatus } from '~/types/api.types';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

@injectable()
export class PayoutsPresenter {
  constructor(
    @inject(Symbol.for(Injectables.AccountStore)) private accountStore: AccountStore,
    @inject(Symbol.for(Injectables.StripeAccountStore))
    private stripeAccountStore: StripeAccountStore
  ) {
    makeAutoObservable(this);
  }

  statusesSelected?: Set<string> = undefined;

  get isReady() {
    return this.accountStore.isLoggedIn;
  }

  get stripeAccountId() {
    return this.accountStore.account?.content?.stripeConnectId;
  }

  get payouts() {
    // we might have demo payouts mock data in user account in SwellJS.
    // they take precedence over real data
    const demoPayouts = this.accountStore.account?.content?.demoPayouts;
    if (!demoPayouts) {
      return this.stripeAccountStore.payouts;
    }

    let demo = this.stripeAccountStore.payouts;
    try {
      demo = JSON.parse(demoPayouts).demoPayouts;
    } catch {
      /* empty */
    }

    return demo.filter((payout) =>
      this.statusesSelected ? this.statusesSelected?.has(payout.status) : true
    );
  }

  listStripePayouts = this.stripeAccountStore.listStripePayouts;
  handleStatusMenuChange = (open: boolean, hasChanged: boolean, selected?: Set<string>) => {
    if (!open && hasChanged && this.stripeAccountId) {
      this.statusesSelected = selected;
      const filteredStatuses = selected ? Array.from(selected as Set<StripeStatus>) : [];
      this.listStripePayouts(this.stripeAccountId, filteredStatuses);
    }
  };
}

export const usePayoutsPresenter = () =>
  useDependency<PayoutsPresenter>(Symbol.for(Injectables.PayoutsPresenter));
