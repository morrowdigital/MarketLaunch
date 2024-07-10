import { FormPresenter } from '~/utils/form.presenter';
import { accountExists, updateAccount } from '~/state/gateways/account';
import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { makeAutoObservable, reaction, IReactionDisposer, runInAction, action } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ToastThemedStore } from '~/components/toast-themed/toast-store';
import { test, enforce } from 'vest';
import debounce from 'lodash.debounce';
import { emailIsValid } from '~/utils/validation-helpers';

type AccountFormData = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const validator = (formData: Partial<AccountFormData>) => {
  test('email', 'Email must be a valid email', emailIsValid(formData));

  test('confirmPassword', 'Passwords must match', () => {
    if (formData.password) {
      enforce(formData.confirmPassword).equals(formData.password);
    }
  });
};

@injectable()
export class AccountFormPresenter {
  private _reactionDisposer?: IReactionDisposer | null = null;

  constructor(
    @inject(Symbol.for(Injectables.FormPresenter))
    private formPresenter: FormPresenter<AccountFormData>,
    @inject(Symbol.for(Injectables.AccountStore))
    private accountStore: AccountStore,
    @inject(Symbol.for(Injectables.ToastThemedStore))
    private toastStore: ToastThemedStore
  ) {
    makeAutoObservable(this, {
      setTouched: action,
      setValue: action,
      setAccountAlreadyExists: action,
      setIsSavingAccount: action,
    });

    const initialData = {
      email: accountStore.account?.email,
    };
    this.formPresenter.init({ validator, initialData });

    runInAction(() => {
      this._reactionDisposer = reaction(() => this.data?.email, this.checkAccountAvailability);
    });
  }

  private _accountAlreadyExists = false;

  get accountAlreadyExists() {
    return this._accountAlreadyExists;
  }

  setAccountAlreadyExists = (value: boolean) => {
    this._accountAlreadyExists = value;
  };

  checkAccountAvailability = debounce(async () => {
    const exists = await accountExists({ email: this.data!.email! });

    // If the account exists and is different from the current email

    if (exists && this.data!.email !== this.accountStore.account?.email) {
      this.setAccountAlreadyExists(exists);
    } else {
      this.setAccountAlreadyExists(false);
    }
  }, 200);

  get data() {
    return this.formPresenter.data;
  }

  get touched() {
    return this.formPresenter.touched;
  }

  get errors() {
    return this.formPresenter.errors;
  }

  get isValid() {
    return this.formPresenter.isValid && !this.accountAlreadyExists;
  }

  private _isSavingAccount = false;

  get isSavingAccount() {
    return this._isSavingAccount;
  }

  setIsSavingAccount = (value: boolean) => {
    this._isSavingAccount = value;
  };

  save = async () => {
    try {
      this.setIsSavingAccount(true);
      const body = {
        email: this.data!.email!,
        password: this.data!.password!,
      };
      const result = await updateAccount(body);

      if (result) {
        runInAction(() => {
          this.toastStore.show('Account Updated', 'Account updated successfully', false);
        });
      }
    } catch (err) {
      runInAction(() => {
        this.toastStore.show(
          'Account Update error',
          (err as Error).message ?? 'There was a problem updating your account',
          true
        );
      });
    } finally {
      this.setIsSavingAccount(false);
    }
  };

  setValue = this.formPresenter.setValue;
  setTouched = this.formPresenter.setTouched;

  cleanup = () => {
    this.formPresenter.cleanup();
    this._reactionDisposer = null;
  };
}

export const useAccountFormPresenter = () =>
  useDependency<AccountFormPresenter>(Symbol.for(Injectables.AccountFormPresenter));
