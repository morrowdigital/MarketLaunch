import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { AccountStore } from '~/state/account-store';
import { makeAutoObservable } from 'mobx';
import { Account } from '~/types/model';

@injectable()
export class SidebarPresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this);
  }

  get account(): Account | undefined {
    return this.accountStore.account;
  }

  get isLoggingOut(): boolean {
    return this.accountStore.isLoggingOut;
  }

  logout = this.accountStore.logout;
}
