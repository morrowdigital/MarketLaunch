import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { AccountStore } from './account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { Product } from '~/types/swell.types';
import { createProduct, deleteProduct, getProduct, updateProduct } from './gateways/product';
import { UpdateProductInput } from '~/types/model';

// Todo: Refactor in separate stores

@injectable()
export class ProductStore {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this, {
      setProduct: action,
      setIsLoadingProduct: action,
      setLoadingError: action,
      setIsDeletingProduct: action,
      setDeletionError: action,
      setDeletionSuccess: action,
      setIsSavingProduct: action,
      setSaveProductSuccess: action,
      setSaveProductError: action,
      resetStore: action,
    });
  }

  private _isLoadingProduct = false;

  get isLoadingProduct() {
    return this._isLoadingProduct;
  }

  setIsLoadingProduct = (value: boolean) => {
    this._isLoadingProduct = value;
  };

  private _product?: Product;

  get product(): Product | undefined {
    return this._product;
  }
  setProduct = (value?: Product) => {
    this._product = value;
  };

  private _loadError?: Error;

  get loadError() {
    return this._loadError;
  }

  setLoadingError = (error: Error) => {
    this._loadError = error;
  };

  loadProduct = async ({ productId }: { productId: string }) => {
    try {
      this.setIsLoadingProduct(true);
      const result = await getProduct({ productId });
      if (result.success) {
        this.setProduct(result.data);
      }
    } catch (err) {
      this.setLoadingError(err as Error);
    } finally {
      this.setIsLoadingProduct(false);
    }
  };

  private _deletionError?: Error;

  get deletionError() {
    return this._deletionError;
  }

  setDeletionError = (error?: Error) => {
    this._deletionError = error;
  };

  private _isDeletingProduct = false;

  get isDeletingProduct() {
    return this._isDeletingProduct;
  }

  setIsDeletingProduct = (value: boolean) => {
    this._isDeletingProduct = value;
  };

  private _deletionSuccess = false;

  get deletionSuccess() {
    return this._deletionSuccess;
  }

  setDeletionSuccess = (value: boolean) => {
    this._deletionSuccess = value;
  };

  deleteProduct = async ({ productId }: { productId: string }) => {
    try {
      this.setIsDeletingProduct(true);
      const result = await deleteProduct({ productId });
      if (result) {
        this.setDeletionSuccess(true);
      }
    } catch (err) {
      this.setDeletionError(err as Error);
      this.setDeletionSuccess(false);
    } finally {
      this.setIsDeletingProduct(false);
    }
  };

  private _saveProductError?: Error;

  get saveProductError() {
    return this._saveProductError;
  }

  setSaveProductError = (error?: Error) => {
    this._saveProductError = error;
  };

  private _isSavingProduct = false;

  get isSavingProduct() {
    return this._isSavingProduct;
  }

  setIsSavingProduct = (value: boolean) => {
    this._isSavingProduct = value;
  };

  private _saveProductSuccess = false;

  get saveProductSuccess() {
    return this._saveProductSuccess;
  }

  setSaveProductSuccess = (value: boolean) => {
    this._saveProductSuccess = value;
  };

  saveProduct = async ({ productId, input }: UpdateProductInput) => {
    try {
      this.setIsSavingProduct(true);
      const result = productId
        ? await updateProduct({ productId, input })
        : await createProduct(input);
      if (result.success) {
        this.setSaveProductSuccess(true);
        this.loadProduct({ productId: result.data.id! });
      }
    } catch (err) {
      this.setSaveProductError(err as Error);
      this.setSaveProductSuccess(false);
    } finally {
      this.setIsSavingProduct(false);
    }
  };

  resetStore = () => {
    this.setProduct(undefined);
  };
}
