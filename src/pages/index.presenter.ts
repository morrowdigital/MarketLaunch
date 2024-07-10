import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';

@injectable()
export class RootPagePresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this);
  }

  get account() {
    return this.accountStore.account;
  }

  get isReady() {
    return this.accountStore.isInitialised;
  }
}
