import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { OrdersStore } from '~/state/orders-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { TabbarTab } from '~/components/tabbar/tabbar';
import { OrderTableFilters } from '~/types/model';
import { AccountStore } from '~/state/account-store';

@injectable()
export class OrdersPresenter {
  _tabs = {
    buyers: [{ index: 0, title: 'My Orders' }],
    vendors: [
      { index: 0, title: 'All Orders' },
      { index: 1, title: 'Awaiting Payment' },
      { index: 2, title: 'Ready to ship' },
      { index: 3, title: 'Refunded' },
    ],
  };

  private currentTab?: TabbarTab = undefined;

  searchTerm = '';

  constructor(
    @inject(Symbol.for(Injectables.OrdersStore)) private orderStore: OrdersStore,
    @inject(Symbol.for(Injectables.AccountStore)) private accountStore: AccountStore
  ) {
    makeAutoObservable(this);
  }

  get account() {
    return this.accountStore.account;
  }

  get tabs() {
    if (!this.accountStore.account) {
      return [];
    }

    return this._tabs[this.accountStore.account.group];
  }

  get isReady() {
    return !this.orderStore.isLoadingOrders && this.account !== undefined;
  }

  get orders() {
    return this.orderStore.orders;
  }

  get currentPage() {
    return this.orderStore.currentPage;
  }

  get pageCount() {
    return this.orderStore.pageCount;
  }

  get canPageBack() {
    return this.currentPage > 1;
  }

  get canPageForward() {
    return this.currentPage < this.pageCount;
  }

  get loadError() {
    return this.orderStore.loadError;
  }

  private _filter = {};

  setTabFilter = (tab: TabbarTab) => {
    this.currentTab = tab;
    const indexToFilter: Record<number, OrderTableFilters> = {
      0: {},
      1: { paid: false, refunded: false },
      2: { status: 'delivery_pending' },
      3: { refunded: true },
    };
    this.orderStore.loadOrders({
      page: 1,
      filters: indexToFilter[tab.index]!,
      search: this.searchTerm,
    });
  };

  nextPage = () => {
    this.orderStore.loadOrders({
      page: this.currentPage + 1,
      filters: this._filter,
      search: this.searchTerm,
    });
  };

  previousPage = () => {
    this.orderStore.loadOrders({
      page: this.currentPage - 1,
      filters: this._filter,
      search: this.searchTerm,
    });
  };

  onSearchTermUpdate = (searchTerm: string) => {
    this.searchTerm = searchTerm;
  };

  onDebounce = () => {
    if (this.currentTab) {
      this.setTabFilter(this.currentTab);
    }
  };
}

export const useOrdersPresenter = () =>
  useDependency<OrdersPresenter>(Symbol.for(Injectables.OrdersPresenter));
