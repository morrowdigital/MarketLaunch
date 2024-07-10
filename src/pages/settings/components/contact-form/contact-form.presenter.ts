import { FormPresenter } from '~/utils/form.presenter';
import { test, enforce } from 'vest';
import { updateAccount } from '~/state/gateways/account';
import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { action, makeAutoObservable, runInAction } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ToastThemedStore } from '~/components/toast-themed/toast-store';
import { emailIsValid, phoneNumberIsValid } from '~/utils/validation-helpers';

type ContactFormData = {
  name?: string;
  email?: string;
  phone?: string;
};

const validator = (formData: Partial<ContactFormData>) => {
  test('name', 'Name is required and must be valid', () => {
    enforce(formData.name).isNotEmpty();
  });

  test('email', 'Email must be a valid email', emailIsValid(formData));
  test('phone', 'Phone must be valid', phoneNumberIsValid(formData));
};

@injectable()
export class ContactFormPresenter {
  constructor(
    @inject(Symbol.for(Injectables.FormPresenter))
    private formPresenter: FormPresenter<ContactFormData>,
    @inject(Symbol.for(Injectables.ToastThemedStore))
    private toastStore: ToastThemedStore,
    @inject(Symbol.for(Injectables.AccountStore))
    accountStore: AccountStore
  ) {
    makeAutoObservable(this, {
      setTouched: action,
      setValue: action,
      setIsSavingContact: action,
    });

    const initialData = {
      name: accountStore.account?.content?.contactName,
      email: accountStore.account?.content?.contactEmail,
      phone: accountStore.account?.content?.contactPhone,
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

  private _isSavingContact = false;

  get isSavingContact() {
    return this._isSavingContact;
  }

  setIsSavingContact = (value: boolean) => {
    this._isSavingContact = value;
  };

  touchFields = () => {
    const keys = Object.keys(this.data as object);
    keys.forEach((key) => this.setTouched(key as keyof ContactFormData, true));
  };

  save = async () => {
    this.touchFields();
    this.formPresenter.validate();
    if (!this.isValid) {
      return;
    }

    try {
      this.setIsSavingContact(true);
      const body = {
        content: {
          contactName: this.data!.name!,
          contactEmail: this.data!.email!,
          contactPhone: this.data!.phone!,
        },
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
      this.setIsSavingContact(false);
    }
  };

  setValue = this.formPresenter.setValue;
  setTouched = this.formPresenter.setTouched;

  cleanup = () => {
    this.formPresenter.cleanup();
  };
}

export const useContactFormPresenter = () =>
  useDependency<ContactFormPresenter>(Symbol.for(Injectables.ContactFormPresenter));
