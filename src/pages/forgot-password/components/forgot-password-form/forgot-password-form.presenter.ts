import { FormPresenter } from '~/utils/form.presenter';
import { test } from 'vest';
import { recoverPassword } from '~/state/gateways/account';
import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { makeAutoObservable } from 'mobx';

import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ToastThemedStore } from '~/components/toast-themed/toast-store';
import { emailIsValid } from '~/utils/validation-helpers';

type ForgotPasswordFormData = {
  email?: string;
};

const validator = (formData: Partial<ForgotPasswordFormData>) => {
  test('email', 'Email must be a valid email', emailIsValid(formData));
};

@injectable()
export class ForgotPasswordFormPresenter {
  constructor(
    @inject(Symbol.for(Injectables.FormPresenter))
    private formPresenter: FormPresenter<ForgotPasswordFormData>,
    @inject(Symbol.for(Injectables.ToastThemedStore))
    private toastStore: ToastThemedStore
  ) {
    makeAutoObservable(this);
    const initialData = {
      email: '',
    };
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

  private _resetPasswordSuccess = false;

  get resetPasswordSuccess() {
    return this._resetPasswordSuccess;
  }

  setResetPasswordSuccess = (value: boolean) => {
    this._resetPasswordSuccess = value;
  };

  resetPassword = async () => {
    if (this.data?.email) {
      this.setIsLoading(true);

      try {
        await recoverPassword({
          email: this.data?.email,
          resetUrl: `${document.location.origin}/forgot-password?key={reset_key}`,
        });

        this.setResetPasswordSuccess(true);
      } catch (err) {
        this.toastStore.show(
          'Reset password',
          (err as Error).message ?? 'There was a problem resetting your password',
          true
        );
      } finally {
        this.setIsLoading(false);
      }
    }
  };

  resendCode = () => {
    this.setResetPasswordSuccess(false);
  };

  setValue = this.formPresenter.setValue;
  setTouched = this.formPresenter.setTouched;

  cleanup = () => {
    this.formPresenter.cleanup();
  };
}

export const useForgotPasswordFormPresenter = () =>
  useDependency<ForgotPasswordFormPresenter>(Symbol.for(Injectables.ForgotPasswordFormPresenter));
