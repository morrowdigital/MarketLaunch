import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';

@injectable()
export class LoginPagePresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this);
  }

  private _email = '';
  get email() {
    return this._email;
  }
  setEmail = (value: string) => {
    this._email = value;
  };

  private _password = '';
  get password() {
    return this._password;
  }
  setPassword = (value: string) => {
    this._password = value;
  };

  get loginButtonDisabled() {
    return this.accountStore.isLoggingIn || this.accountStore.isLoggingOut;
  }

  login = async () => {
    const loginResult = await this.accountStore.login(this.email, this.password);
    return loginResult;
  };
}
