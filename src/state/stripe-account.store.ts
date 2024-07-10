import { action, makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import { StripeAccountInput } from '~/types/model';
import Stripe from 'stripe';
import { getStripeAccount, linkStripeAccount, listStripePayouts } from './gateways/stripe';
import { StripeAccount, StripeStatus } from '~/types/api.types';

@injectable()
export class StripeAccountStore {
  constructor() {
    makeAutoObservable(this, {
      setIsCreatingStripeAccount: action,
      setStripeAccount: action,
      setStripeAccountLink: action,
      setIsLinkingStripeAccount: action,
      setIsLoadingStripeAccount: action,
      setStripePayouts: action,
      setIsListingStripePayouts: action,
    });
  }

  private _isCreatingStripeAccount = false;

  get isCreatingStripeAccount() {
    return this._isCreatingStripeAccount;
  }

  setIsCreatingStripeAccount = (value: boolean) => {
    this._isCreatingStripeAccount = value;
  };

  private _stripeAccount?: StripeAccount;

  setStripeAccount = (account: StripeAccount) => {
    this._stripeAccount = account;
  };

  private _stripeAccountLink?: Stripe.AccountLink;

  get stripeAccountLink() {
    return this._stripeAccountLink?.url;
  }

  setStripeAccountLink = (accountLink: Stripe.AccountLink) => {
    this._stripeAccountLink = accountLink;
  };

  private _isLinkingStripeAccount = false;

  get isLinkingStripeAccount() {
    return this._isLinkingStripeAccount;
  }

  setIsLinkingStripeAccount = (value: boolean) => {
    this._isLinkingStripeAccount = value;
  };

  linkStripeAccount = async ({ stripeConnectId }: { stripeConnectId?: string }) => {
    try {
      this.setIsLinkingStripeAccount(true);
      const result = await linkStripeAccount({ stripeConnectId });
      if (result.success) {
        this.setStripeAccountLink(result.data);
      }
    } finally {
      this.setIsLinkingStripeAccount(false);
    }
  };

  private _isLoadingStripeAccount = false;

  get isLoadingStripeAccount() {
    return this._isLoadingStripeAccount;
  }

  setIsLoadingStripeAccount = (value: boolean) => {
    this._isLoadingStripeAccount = value;
  };

  get stripeAccount() {
    return this._stripeAccount;
  }

  loadStripeAccount = async ({ stripeAccountId }: StripeAccountInput) => {
    try {
      this.setIsLoadingStripeAccount(true);
      const result = await getStripeAccount({ stripeAccountId });

      if (result.success) {
        this.setStripeAccount(result.data);
      }
    } finally {
      this.setIsLoadingStripeAccount(false);
    }
  };

  _payouts: Stripe.Payout[] = [];
  get payouts() {
    return this._payouts;
  }

  setStripePayouts = (payouts: Stripe.Payout[]) => {
    this._payouts = payouts;
  };

  private _isListingStripePayouts = false;

  get isListingStripePayouts() {
    return this._isListingStripePayouts;
  }

  setIsListingStripePayouts = (value: boolean) => {
    this._isListingStripePayouts = value;
  };

  listStripePayouts = async (stripeConnectId: string, filtered: StripeStatus[]) => {
    try {
      this.setIsListingStripePayouts(true);
      const result = await listStripePayouts(stripeConnectId, filtered);
      if (result.success) {
        this.setStripePayouts(result.data);
      }
    } finally {
      this.setIsListingStripePayouts(false);
    }
  };
}
