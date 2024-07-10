import { action, makeAutoObservable, runInAction } from 'mobx';
import { injectable } from 'inversify';
import { Account } from '~/types/model';
import { createBuyer, createVendor, getAccount, login, logout } from '~/state/gateways/account';
import { BuyerCreateData, VendorCreateData } from '~/types/api.types';

@injectable()
export class AccountStore {
  constructor() {
    makeAutoObservable(this, {
      setAccount: action,
      setIsLoggingOut: action,
      setIsInitialised: action,
      setIsLoadingAccount: action,
      setIsLoggingIn: action,
    });
    runInAction(() => {
      this.loadAccount().then();
    });
  }

  private _account?: Account = undefined;
  get account(): Account | undefined {
    return this._account;
  }
  setAccount = (value: Account | undefined) => {
    this._account = value;
  };

  private _isLoggingOut = false;
  get isLoggingOut(): boolean {
    return this._isLoggingOut;
  }
  setIsLoggingOut = (value: boolean) => {
    this._isLoggingOut = value;
  };

  private _isLoggingIn = false;
  get isLoggingIn(): boolean {
    return this._isLoggingIn;
  }
  setIsLoggingIn = (value: boolean) => {
    this._isLoggingIn = value;
  };

  private _isLoadingAccount = false;
  setIsLoadingAccount = (value: boolean) => {
    this._isLoadingAccount = value;
  };

  public _isInitialised = false;
  get isInitialised(): boolean {
    return this._isInitialised;
  }
  setIsInitialised = (value: boolean) => {
    this._isInitialised = value;
  };

  get isLoggedIn(): boolean {
    return Boolean(this.account);
  }

  login = async (email: string, password: string): Promise<boolean> => {
    let success = false;

    try {
      this.setIsLoggingIn(true);
      const account = await login(email, password);
      success = Boolean(account);

      this.setAccount(account ?? undefined);
    } finally {
      this.setIsLoggingIn(false);
    }

    return success;
  };

  logout = async () => {
    try {
      this.setIsLoggingOut(true);
      const result = await logout();
      if (result.success) {
        this.setAccount(undefined);
      }
    } finally {
      this.setIsLoggingOut(false);
    }
  };

  createBuyer = async (data: BuyerCreateData) => {
    try {
      this.setIsLoggingIn(true);
      await createBuyer(data);
    } finally {
      this.setIsLoggingIn(false);
    }
  };

  createVendor = async (data: VendorCreateData) => {
    try {
      this.setIsLoggingIn(true);
      await createVendor(data);
    } finally {
      this.setIsLoggingIn(false);
    }
  };

  private loadAccount = async () => {
    try {
      this.setIsLoadingAccount(true);
      const result = await getAccount();
      this.setAccount(result ?? undefined);
    } finally {
      this.setIsLoadingAccount(false);
      this.setIsInitialised(true);
    }
  };
}
