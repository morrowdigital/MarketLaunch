import { FormPresenter } from '~/utils/form.presenter';
import { updateAccount } from '~/state/gateways/account';
import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { action, makeAutoObservable, runInAction } from 'mobx';
import { AccountStore } from '~/state/account-store';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ToastThemedStore } from '~/components/toast-themed/toast-store';
import { uploadFile } from '~/state/gateways/files';

type VendorFormData = {
  businessName?: string;
  vendorLogo?: string;
};

const validator = (_formData: Partial<VendorFormData>) => {};

@injectable()
export class VendorFormPresenter {
  constructor(
    @inject(Symbol.for(Injectables.FormPresenter))
    private formPresenter: FormPresenter<VendorFormData>,
    @inject(Symbol.for(Injectables.ToastThemedStore))
    private toastStore: ToastThemedStore,
    @inject(Symbol.for(Injectables.AccountStore))
    accountStore: AccountStore
  ) {
    makeAutoObservable(this, {
      setTouched: action,
      setValue: action,
      setIsSavingVendor: action,
      setIsUploadingImage: action,
    });

    const initialData = {
      businessName: accountStore.account?.content?.businessName,
      vendorLogo: accountStore.account?.content?.vendorLogo,
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

  private _isSavingVendor = false;

  get isSavingVendor() {
    return this._isSavingVendor;
  }

  setIsSavingVendor = (value: boolean) => {
    this._isSavingVendor = value;
  };

  private _isUploadingImage = false;

  get isUploadingImage() {
    return this._isUploadingImage;
  }

  setIsUploadingImage = (value: boolean) => {
    this._isUploadingImage = value;
  };

  handleImageUpload = async (imageString: string) => {
    try {
      this.setIsUploadingImage(true);
      const image = await uploadFile(imageString);

      this.setValue('vendorLogo', image.url);
    } catch (err) {
      this.toastStore.show(
        'Upload Image',
        `${(err as Error).message}. Try again later.` ??
          'There was a problem uploading your image. Try again later.',
        true
      );
    } finally {
      this.setIsUploadingImage(false);
    }
  };

  save = async () => {
    try {
      this.setIsSavingVendor(true);
      const body = {
        content: {
          businessName: this.data?.businessName,
          vendorLogo: this.data?.vendorLogo,
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
      this.setIsSavingVendor(false);
    }
  };

  setValue = this.formPresenter.setValue;
  setTouched = this.formPresenter.setTouched;

  cleanup = () => {
    this.formPresenter.cleanup();
  };
}

export const useVendorFormPresenter = () =>
  useDependency<VendorFormPresenter>(Symbol.for(Injectables.VendorFormPresenter));
