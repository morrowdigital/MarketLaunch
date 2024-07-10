import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { ProductOption } from 'swell-js';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ProductFormPresenter } from '../product-form/product-form.presenter';
import ObjectId from 'bson-objectid';

// Our UI and Swell's naming are a little different, the mapping is:
// -- MarketLaunch | Swell --
// Variant         | Option
// Variant Option  | Option Value
// Stock Variation | Variant

@injectable()
export class VariantFormPresenter {
  constructor() {
    makeAutoObservable(this);
  }

  private _option?: ProductOption;
  get option() {
    return this._option;
  }

  private productformPresenter?: ProductFormPresenter;

  init = (productFormPresenter: ProductFormPresenter, option: ProductOption) => {
    // Avoid having to worry about option.values being undefined
    if (option.values === undefined) {
      option.values = [];
    }

    this._option = option;
    this.productformPresenter = productFormPresenter;
  };

  get hasVariantOptions() {
    return Boolean(this.option?.values);
  }

  setOptionName = (name: string) => {
    if (this.option) {
      this.option.name = name;
    }
  };

  private _valueNameBuffer: string = '';

  get valueName() {
    return this._valueNameBuffer;
  }

  setValueName = (name: string) => {
    this._valueNameBuffer = name;
  };

  addNewValue = () => {
    this.option?.values?.push({
      name: this._valueNameBuffer,
      id: ObjectId().toHexString(),
    });

    this._valueNameBuffer = '';
  };

  removeOptionValue = (valueName: string) => {
    if (this.option) {
      this.option.values = this.option.values!.filter((value) => value.name !== valueName);
    }
  };

  saveOption = (callback: () => void) => {
    const option = this.option;
    if (option === undefined || this.productformPresenter === undefined) {
      return;
    }

    let productOptions = this.productformPresenter.productOptions;
    if (option.id === undefined) {
      // No Swell ID, this means we are creating, and need to generate our own ID
      option.id = ObjectId().toHexString();
      productOptions.push(option);
    } else {
      // Remove the current (unedited) option from the array
      productOptions = productOptions.filter((item) => item.id !== option.id);
      // Add our edited option back into it, messing up ordering but doesn't matter
      productOptions.push(option);
    }

    this.productformPresenter.setProductOptions(productOptions);
    callback();
  };

  cleanup = () => {};
}

export const useVariantFormPresenter = () =>
  useDependency<VariantFormPresenter>(Symbol.for(Injectables.VariantFormPresenter));
