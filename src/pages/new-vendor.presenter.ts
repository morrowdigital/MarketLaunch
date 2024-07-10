import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { enforce, test } from 'vest';
import { uploadFile } from '~/state/gateways/files';
import { validateForm } from '~/utils/validate-form';
import { VendorCreateData } from '~/types/api.types';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { isBase64EncodedImage } from '~/utils/base64';
import { phoneNumberIsValid } from '~/utils/validation-helpers';

type RegistrationFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  terms: boolean;
  phone: string;
  businessName?: string;
  contactEmail: string;
  vendorLogo?: string;
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

  test('contactEmail', 'Contact email is required', () => {
    enforce(formData.contactEmail).isNotEmpty();
  });

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
  contactEmail: '',
};

@injectable()
export class NewVendorPagePresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this);
  }

  private _isUploadingImage = false;
  private _setIsUploadingImage = (isUploadingImage: boolean) => {
    this._isUploadingImage = isUploadingImage;
  };

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
    return this.accountStore.isLoggingIn || this._isUploadingImage;
  }

  private _uploadImage = async (): Promise<string | undefined> => {
    if (!this.formData.vendorLogo) {
      return undefined;
    }

    // If vendorLogo is not base64 encoded it has already been loaded and contains a
    // regular URL from the server so we return that.

    if (this.formData.vendorLogo && !isBase64EncodedImage(this.formData.vendorLogo)) {
      return this.formData.vendorLogo;
    }

    this._setIsUploadingImage(true);
    try {
      return (await uploadFile(this.formData.vendorLogo)).url;
    } finally {
      this._setIsUploadingImage(false);
    }
  };

  onFormSubmit = async (): Promise<{ action: 'none' | 'error' | 'success'; error?: string }> => {
    const result = validateForm(this._formData, validator);
    this._setFormErrors(result.getErrors() as RegistrationFormErrors);

    if (!this.isFormValid) {
      return { action: 'none' };
    }

    try {
      this._setIsUploadingImage(true);
      const uploadedImageUrl = await this._uploadImage();
      this.updateField('vendorLogo')(uploadedImageUrl);

      await this.accountStore.createVendor(getVendorCreateData(this.formData));
      return { action: 'success' };
    } catch (error) {
      return { action: 'error', error: (error as Error).message };
    } finally {
      this._setIsUploadingImage(false);
    }
  };
}

function getVendorCreateData(formData: RegistrationFormData): VendorCreateData {
  return {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    password: formData.password,
    phone: formData.phone,
    content: {
      businessName: formData.businessName,
      contactEmail: formData.contactEmail,
      vendorLogo: formData.vendorLogo,
    },
  };
}
