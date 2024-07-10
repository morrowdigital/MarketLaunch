import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { ProductStore } from '~/state/product-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependencyWithInit } from '~/utils/inversifyJS/use-dependency';
import { ProductFormPresenter } from '~/components/product-form/product-form.presenter';
import { ProductOption } from 'swell-js';

@injectable()
export class ProductVariantsPresenter {
  private productFormPresenter?: ProductFormPresenter;

  constructor(
    @inject(Symbol.for(Injectables.ProductStore))
    private productStore: ProductStore
  ) {
    makeAutoObservable(this, {
      init: action,
    });
  }

  init = (parentProductFormPresenter: ProductFormPresenter) => {
    this.productFormPresenter = parentProductFormPresenter;
  };

  get productOptions() {
    return this.productFormPresenter?.productOptions;
  }

  setProductOptions = (options: ProductOption[]) => {
    this.productFormPresenter?.setProductOptions(options);
  };

  deleteOption = (toRemove: ProductOption) => {
    if (this.productOptions) {
      this.setProductOptions(this.productOptions?.filter((option) => option !== toRemove));
    }
  };
}

export const useProductVariantsPresenter = (parentProductFormPresenter: ProductFormPresenter) =>
  useDependencyWithInit<ProductFormPresenter, ProductVariantsPresenter>(
    Symbol.for(Injectables.ProductVariantsPresenter),
    parentProductFormPresenter
  );
