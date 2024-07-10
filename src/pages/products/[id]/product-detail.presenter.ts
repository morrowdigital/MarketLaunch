import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

import { ProductStore } from '~/state/product-store';

@injectable()
export class ProductDetailPresenter {
  constructor(
    // TODO refactor: ProductStore is injected as a singleton here but it should be
    // injected as transient. Because it depends on the product currently viewed it
    // should be initialised here, and exported for the other presenters to use.
    @inject(Symbol.for(Injectables.ProductStore)) private productStore: ProductStore
  ) {
    makeAutoObservable(this);
  }

  get isReady() {
    return !this.productStore.isLoadingProduct;
  }

  get product() {
    return this.productStore.product;
  }

  get loadError() {
    return this.productStore.loadError;
  }

  get deletionError() {
    return this.productStore.deletionError;
  }

  get isDeletingProduct() {
    return this.productStore.isDeletingProduct;
  }

  loadProduct = ({ productId }: { productId: string }) => {
    this.productStore.loadProduct({ productId });
  };

  deleteProduct = () => {
    if (this.product && this.product.id) {
      this.productStore.deleteProduct({ productId: this.product?.id });
    }
  };

  resetDeletionError = () => {
    this.productStore.setDeletionError(undefined);
  };

  get deletionSuccess() {
    return this.productStore.deletionSuccess;
  }

  setDeletionSuccess = this.productStore.setDeletionSuccess;

  get saveProductSuccess() {
    return this.productStore.saveProductSuccess;
  }

  get saveProductError() {
    return this.productStore.saveProductError;
  }

  setSaveProductError = this.productStore.setSaveProductError;
  setSaveProductSuccess = this.productStore.setSaveProductSuccess;

  onCleanUp = () => {
    this.productStore.resetStore();
  };
}

export const useProductDetailPresenter = () =>
  useDependency<ProductDetailPresenter>(Symbol.for(Injectables.ProductDetailPresenter));
