import { FormPresenter } from '~/utils/form.presenter';
import { test, enforce } from 'vest';
import { recoverPassword } from '~/state/gateways/account';
import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { makeAutoObservable } from 'mobx';

import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ToastThemedStore } from '~/components/toast-themed/toast-store';

import Router from 'next/router';

type ChangePasswordFormData = {
  password?: string;
  confirmPassword?: string;
};

const validator = (formData: Partial<ChangePasswordFormData>) => {
  test('password', 'Password is required', () => {
    enforce(formData.password).isNotEmpty();
  });

  test('confirmPassword', 'Passwords must match', () => {
    enforce(formData.confirmPassword).equals(formData.password);
  });
};

@injectable()
export class ChangePasswordFormPresenter {
  constructor(
    @inject(Symbol.for(Injectables.FormPresenter))
    private formPresenter: FormPresenter<ChangePasswordFormData>,
    @inject(Symbol.for(Injectables.ToastThemedStore))
    private toastStore: ToastThemedStore
  ) {
    makeAutoObservable(this);
    const initialData = {};
    this.formPresenter.init({ validator, initialData });
  }

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
    return this.formPresenter.isValid;
  }

  private _resetKey?: string;

  get resetKey() {
    return this._resetKey;
  }

  setResetKey = (value: string) => {
    this._resetKey = value;
  };

  private _isLoading = false;

  get isLoading() {
    return this._isLoading;
  }

  setIsLoading = (value: boolean) => {
    this._isLoading = value;
  };

  private _changePasswordSuccess = false;

  get changePasswordSuccess() {
    return this._changePasswordSuccess;
  }

  setChangePasswordSuccess = (value: boolean) => {
    this._changePasswordSuccess = value;
  };

  savePassword = async () => {
    try {
      this.setIsLoading(true);
      await recoverPassword({ resetKey: this.resetKey, password: this.data?.password });

      this.toastStore.show(
        'Change Password',
        'Your password has been changed successfully!',
        false
      );

      setTimeout(() => {
        Router.push('/login');
      }, 1000);
    } catch (err) {
      console.log(err);
      this.toastStore.show(
        'Recover password',
        (err as Error).message || 'There was a problem resetting your password',
        true
      );
    } finally {
      this.setIsLoading(false);
    }
  };

  setValue = this.formPresenter.setValue;
  setTouched = this.formPresenter.setTouched;

  cleanup = () => {
    this.formPresenter.cleanup();
  };
}

export const useChangePasswordFormPresenter = () =>
  useDependency<ChangePasswordFormPresenter>(Symbol.for(Injectables.ChangePasswordFormPresenter));
