import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { AccountStore } from '~/state/account-store';
import { makeAutoObservable, runInAction } from 'mobx';

@injectable()
export class ForbiddenPresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this);
  }

  private _isLoggingOut = false;
  private _setIsLoggingOut = (value: boolean) => (this._isLoggingOut = value);
  get isLoggingOut() {
    return this._isLoggingOut;
  }

  logout = async () => {
    try {
      this._setIsLoggingOut(true);
      await this.accountStore.logout();
    } finally {
      runInAction(() => {
        this._setIsLoggingOut(false);
      });
    }
  };
}
