import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

import { OrderStore } from '~/state/order-store';
import { AccountStore } from '~/state/account-store';

@injectable()
export class OrderDetailPresenter {
  constructor(
    @inject(Symbol.for(Injectables.OrderStore)) private orderStore: OrderStore,
    @inject(Symbol.for(Injectables.AccountStore)) private accountStore: AccountStore
  ) {
    makeAutoObservable(this, {
      setIsPrinting: action,
    });
  }

  get account() {
    return this.accountStore.account;
  }

  get isReady() {
    return !this.orderStore.isLoadingOrder;
  }

  get order() {
    return this.orderStore.order;
  }

  get loadError() {
    return this.orderStore.loadError;
  }

  private _isPrinting = false;

  get isPrinting() {
    return this._isPrinting;
  }

  setIsPrinting = (isPrinting: boolean) => {
    this._isPrinting = isPrinting;
  };

  loadOrder = ({ orderId }: { orderId: string }) => {
    this.orderStore.loadOrder({ orderId });
  };
}

export const useOrderDetailPresenter = () =>
  useDependency<OrderDetailPresenter>(Symbol.for(Injectables.OrderDetailPresenter));
