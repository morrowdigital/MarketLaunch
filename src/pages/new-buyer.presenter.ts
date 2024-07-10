import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { enforce, test } from 'vest';
import { FormSubmitResult } from '~/types/model';
import { validateForm } from '~/utils/validate-form';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { phoneNumberIsValid } from '~/utils/validation-helpers';

type RegistrationFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  terms: boolean;
  phone: string;
};
type RegistrationFormErrors = Partial<Record<keyof RegistrationFormData, string[]>>;

const validator = (formData: Partial<RegistrationFormData>) => {
  test('email', 'Email is required and must be valid', () => {
    enforce(formData.email).isNotEmpty();
  });

  test('password', 'Password is required', () => {
    enforce(formData.password).isNotEmpty();
  });

  test('confirmPassword', 'Passwords must match', () => {
    enforce(formData.confirmPassword).isNotEmpty();
    enforce(formData.password).equals(formData.confirmPassword);
  });

  test('firstName', 'First name is required', () => {
    enforce(formData.firstName).isNotEmpty();
  });

  test('lastName', 'Last name is required', () => {
    enforce(formData.lastName).isNotEmpty();
  });

  test('phone', 'Contact phone is required', () => {
    enforce(formData.phone).isNotEmpty();
  });

  test('phone', 'Contact phone must be valid', phoneNumberIsValid(formData));

  test('terms', 'You must agree to the terms and conditions', () => {
    enforce(formData.terms).isTruthy();
  });
};

const initialForm: RegistrationFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  terms: false,
  phone: '',
};

@injectable()
export class NewBuyerPagePresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this);
  }

  private _formData: RegistrationFormData = initialForm;

  get formData(): RegistrationFormData {
    return this._formData;
  }

  updateField =
    (field: keyof RegistrationFormData) => (value: RegistrationFormData[typeof field]) => {
      runInAction(() => {
        this._formData = { ...this._formData, [field]: value };
      });
    };

  private _formErrors: RegistrationFormErrors = {};

  private _setFormErrors = (errors: RegistrationFormErrors) => {
    this._formErrors = errors;
  };

  get formErrors(): RegistrationFormErrors {
    return this._formErrors;
  }

  get isFormValid(): boolean {
    return Object.values(this._formErrors).every((errors) => errors.length === 0);
  }

  get isSubmitting(): boolean {
    return this.accountStore.isLoggingIn;
  }

  onFormSubmit = async (): Promise<FormSubmitResult> => {
    const result = validateForm(this._formData, validator);
    this._setFormErrors(result.getErrors() as RegistrationFormErrors);

    if (!this.isFormValid) {
      return { action: 'none' };
    }

    try {
      await this.accountStore.createBuyer({
        email: this.formData.email,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        password: this.formData.password,
        phone: this.formData.phone,
      });
      return { action: 'success' };
    } catch (error) {
      return { action: 'error', error: (error as Error).message };
    }
  };
}
