import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { AccountStore } from './account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { Product } from '~/types/swell.types';
import { getProducts, searchProducts } from './gateways/product';

// Todo: Look into the possibility of making this class generic

@injectable()
export class ProductsStore {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this, {
      setProducts: action,
      setPageCount: action,
      setLoadingError: action,
      setCurrentPage: action,
      setIsLoadingProducts: action,
    });
  }

  private _isLoadingProducts = false;

  get isLoadingProducts() {
    return this._isLoadingProducts;
  }

  setIsLoadingProducts = (value: boolean) => {
    this._isLoadingProducts = value;
  };

  private _products: Product[] = [];
  get products(): Product[] {
    return this._products;
  }
  setProducts = (value: Product[]) => {
    this._products = value;
  };

  private _pageCount = 0;
  get pageCount() {
    return this._pageCount;
  }

  setPageCount = (value: number) => {
    this._pageCount = value;
  };

  private _loadError?: Error;

  get loadError() {
    return this._loadError;
  }

  setLoadingError = (error: Error) => {
    this._loadError = error;
  };

  private _currentPage = 1;
  get currentPage() {
    return this._currentPage;
  }

  setCurrentPage = (value: number) => {
    this._currentPage = value;
  };

  loadProducts = async ({ page, limit }: { page: number; limit?: number }) => {
    try {
      this.setIsLoadingProducts(true);
      const result = await getProducts({ page, limit });
      if (result.success) {
        this.setProducts(result.data.results);
        this.setPageCount(result.data.pageCount);
        this.setCurrentPage(result.data.page);
      }
    } catch (err) {
      this.setLoadingError(err as Error);
    } finally {
      this.setIsLoadingProducts(false);
    }
  };

  searchProducts = async ({
    page,
    query,
    limit,
    statuses,
  }: {
    page: number;
    query?: string;
    limit?: number;
    statuses?: string[];
  }) => {
    try {
      this.setIsLoadingProducts(true);
      const result = await searchProducts({ page, query, limit, statuses });
      if (result.success) {
        this.setProducts(result.data.results);
        this.setPageCount(result.data.pageCount);
        this.setCurrentPage(result.data.page);
      }
    } catch (err) {
      this.setLoadingError(err as Error);
    } finally {
      this.setIsLoadingProducts(false);
    }
  };
}
