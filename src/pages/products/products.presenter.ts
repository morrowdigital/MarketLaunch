import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ProductsStore } from '~/state/products-store';
import debounce from 'lodash.debounce';

@injectable()
export class ProductsPresenter {
  constructor(@inject(Symbol.for(Injectables.ProductsStore)) private productsStore: ProductsStore) {
    makeAutoObservable(this);
  }

  get currentPage() {
    return this.productsStore.currentPage;
  }

  get pageCount() {
    return this.productsStore.pageCount;
  }
  nextPage = () => {
    if (this.hasSearchTerm) {
      this.productsStore.searchProducts({ page: this.currentPage + 1, query: this.searchTerm! });
    } else {
      this.productsStore.loadProducts({ page: this.currentPage + 1 });
    }
  };
  previousPage = () => {
    if (this.hasSearchTerm) {
      this.productsStore.searchProducts({ page: this.currentPage - 1, query: this.searchTerm! });
    } else {
      this.productsStore.loadProducts({ page: this.currentPage - 1 });
    }
  };

  get loadError() {
    return this.productsStore.loadError;
  }

  get products() {
    return this.productsStore.products;
  }

  get isReady() {
    return !this.productsStore.isLoadingProducts;
  }

  loadProducts = () => {
    this.productsStore.loadProducts({ page: this.currentPage });
  };

  private _searchTerm?: string;

  get searchTerm() {
    return this._searchTerm;
  }

  setSearchTerm = (value: string) => {
    this._searchTerm = value;
  };

  get hasSearchTerm() {
    return this.searchTerm !== undefined && this.searchTerm.length > 0;
  }

  handleStatusMenuChange = (open: boolean, hasChanged: boolean, selected?: Set<string>) => {
    if (!open && hasChanged) {
      this.searchProducts(selected);
    }
  };

  get noSearchResults() {
    return this.hasSearchTerm && this.products.length === 0;
  }

  handleSearchTermChange = debounce((value: string) => {
    this.setSearchTerm(value);
    this.productsStore.setCurrentPage(0);
    this.productsStore.searchProducts({ page: this.currentPage });
  }, 300);

  searchProducts = async (validStatuses?: Set<string>) => {
    this.productsStore.searchProducts({
      page: this.currentPage,
      query: this.searchTerm,
      statuses: validStatuses && Array.from(validStatuses),
    });
  };
}

export const useProductsPresenter = () =>
  useDependency<ProductsPresenter>(Symbol.for(Injectables.ProductsPresenter));
