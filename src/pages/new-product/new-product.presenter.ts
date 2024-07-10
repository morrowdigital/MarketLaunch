import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ProductStore } from '~/state/product-store';

@injectable()
export class NewProductPresenter {
  constructor(@inject(Symbol.for(Injectables.ProductStore)) private productStore: ProductStore) {
    makeAutoObservable(this);
  }

  get product() {
    return this.productStore.product;
  }

  get saveProductSuccess() {
    return this.productStore.saveProductSuccess;
  }

  get saveProductError() {
    return this.productStore.saveProductError;
  }

  setSaveProductError = this.productStore.setSaveProductError;
  setSaveProductSuccess = this.productStore.setSaveProductSuccess;
}

export const useNewProductPresenter = () =>
  useDependency<NewProductPresenter>(Symbol.for(Injectables.NewProductPresenter));
