import { injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { ProductOption, Variant } from 'swell-js';
import { OptionValueSnake } from 'swell-js/types/product/snake';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependencyWithInit } from '~/utils/inversifyJS/use-dependency';
import { ProductFormPresenter } from '../product-form/product-form.presenter';

@injectable()
export class StockFormPresenter {
  constructor() {
    makeAutoObservable(this);
  }

  private productFormPresenter?: ProductFormPresenter;

  get productOptions() {
    return this.productFormPresenter!.productOptions;
  }

  init = (productFormPresenter: ProductFormPresenter) => {
    this.productFormPresenter = productFormPresenter;
  };

  private _variant?: Variant;
  get variant() {
    return this._variant;
  }

  private _selectedOptions: Record<string, OptionValueSnake> = {};
  get selectedOptions() {
    return this._selectedOptions;
  }

  selectedOptionValueName = (optionId: string) => {
    const value = this.selectedOptions[optionId];
    if (value?.name !== undefined) {
      return value.name;
    } else {
      return undefined;
    }
  };

  setVariant = (variant?: Variant) => {
    for (const option of this.productOptions) {
      for (const id of variant?.optionValueIds || []) {
        const selectedValue = option.values?.find((item) => item.id === id);
        if (selectedValue) {
          this._selectedOptions[option.id!] = selectedValue;
        }
      }
    }

    this._variant = variant;
  };

  handleOptionValueChange = (option: ProductOption) => {
    return action((valueId: string) => {
      this._formTouched = true;

      const optionValue = option.values?.find((item) => item.id === valueId);
      if (optionValue !== undefined) {
        this._selectedOptions[option.id!] = optionValue;
      }
    });
  };

  get variantName() {
    const values = Object.values(this.selectedOptions);
    const sortedNames = values.map((item) => item.name!).sort();
    const name = sortedNames.join(', ').trim();

    return name;
  }

  get variantOptionValueIds() {
    const values = Object.values(this.selectedOptions);
    const ids = values.map((item) => item.id!);
    return ids;
  }

  saveVariant = async (onComplete: () => void) => {
    if (this.productFormPresenter === undefined) {
      return;
    }

    const newVariant: Variant = {
      name: this.variantName,
      optionValueIds: this.variantOptionValueIds,
    };

    let stockVariants = this.productFormPresenter.productStockVariants;
    if (this.variant?.id !== undefined) {
      stockVariants = stockVariants.filter((option) => this.variant!.id !== option.id);
      newVariant.id = this.variant.id;
    }

    stockVariants.push(newVariant);
    this.productFormPresenter.setProductStockVariants(stockVariants);
    onComplete();
  };

  private get variantAlreadyExists() {
    const variant = this.productFormPresenter?.productStockVariants.find(
      (item) => item.name === this.variantName
    );

    if (variant) {
      return true;
    } else {
      return false;
    }
  }

  private _formTouched: boolean = false;

  get showAlreadyExists() {
    return this._formTouched && this.variantAlreadyExists;
  }
}

export const useStockFormPresenter = (presenter: ProductFormPresenter) =>
  useDependencyWithInit<ProductFormPresenter, StockFormPresenter>(
    Symbol.for(Injectables.StockFormPresenter),
    presenter
  );
