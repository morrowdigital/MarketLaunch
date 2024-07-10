// Todo: Look into the possibility of making this class generic

import { inject, injectable } from 'inversify';
import { action, makeAutoObservable, reaction, runInAction } from 'mobx';
import { getOrders } from './gateways/order';
import { Order } from 'swell-js';
import { AccountStore } from './account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { OrderTableFilters } from '~/types/model';

@injectable()
export class OrdersStore {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this, {
      setOrders: action,
      setIsLoadingOrders: action,
      setLoadingError: action,
      setPageCount: action,
      setCurrentPage: action,
    });

    reaction(
      () => this.accountStore.account,
      (account) => {
        if (account?.id) {
          runInAction(() => {
            this.loadOrders({ page: this.currentPage, filters: {} }).then();
          });
        }
      }
    );
  }

  private _isLoadingOrders = false;

  get isLoadingOrders() {
    return this._isLoadingOrders;
  }

  setIsLoadingOrders = (value: boolean) => {
    this._isLoadingOrders = value;
  };

  private _orders: Order[] = [];
  get orders(): Order[] {
    return this._orders;
  }
  setOrders = (value: Order[]) => {
    this._orders = value;
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

  loadOrders = async ({
    page,
    limit,
    filters,
    search,
  }: {
    page: number;
    limit?: number;
    filters: OrderTableFilters;
    search?: string;
  }) => {
    try {
      this.setIsLoadingOrders(true);
      const isVendorAccount = this.accountStore.account?.group !== 'buyers';
      const result = await getOrders({ page, limit, filters, vendor: isVendorAccount, search });
      if (result.success) {
        this.setOrders(result.data.results);
        this.setPageCount(result.data.pageCount);
        this.setCurrentPage(result.data.page);
      }
    } catch (err) {
      this.setLoadingError(err as Error);
    } finally {
      this.setIsLoadingOrders(false);
    }
  };
}
