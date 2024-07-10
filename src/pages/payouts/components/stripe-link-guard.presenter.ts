import { inject, injectable } from 'inversify';
import { IReactionDisposer, makeAutoObservable, reaction, runInAction } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { AccountStore } from '~/state/account-store';
import { StripeAccountStore } from '~/state/stripe-account.store';

@injectable()
export class StripeLinkGuardPresenter {
  private _reactionDisposer: IReactionDisposer | null = null;

  constructor(
    @inject(Symbol.for(Injectables.AccountStore)) private accountStore: AccountStore,
    @inject(Symbol.for(Injectables.StripeAccountStore))
    private stripeAccountStore: StripeAccountStore
  ) {
    makeAutoObservable(this);

    runInAction(() => {
      this._reactionDisposer = reaction(
        () => this.accountStore.account,
        async (account) => {
          if (account?.content?.stripeConnectId) {
            await this.loadStripeAccount({ stripeAccountId: account.content.stripeConnectId });
          }

          await runInAction(async () => {
            if (account && this.needsToCompleteSetup) {
              await this.linkStripeAccount({ stripeConnectId: account.content?.stripeConnectId });
            }
          });
        },
        { fireImmediately: true }
      );
    });
  }

  get account() {
    return this.accountStore.account;
  }

  get stripeAccount() {
    return this.stripeAccountStore.stripeAccount;
  }

  get needsToCompleteSetup() {
    const connectIdSet = Boolean(this.account?.content?.stripeConnectId);
    // Needs to complete setup if:
    // 1. The connect ID is not set, or
    // 2. The Stripe account exists but the details haven't been submitted
    const needsSetup =
      !connectIdSet || (this.stripeAccount && !this.stripeAccount.detailsSubmitted);
    return needsSetup;
  }

  get stripeAccountLink() {
    return this.stripeAccountStore.stripeAccountLink || '';
  }

  loadStripeAccount = this.stripeAccountStore.loadStripeAccount;
  linkStripeAccount = this.stripeAccountStore.linkStripeAccount;

  get isLoadingStripeAccountLink() {
    return (
      this.stripeAccountStore.isLinkingStripeAccount ??
      this.stripeAccountStore.isLoadingStripeAccount
    );
  }

  cleanup = () => {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = null;
    }
  };
}

export const useStripeLinkGuardPresenter = () =>
  useDependency<StripeLinkGuardPresenter>(Symbol.for(Injectables.StripeLinkGuardPresenter));
