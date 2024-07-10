import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { getOrder, fulfilOrder, cancelOrder } from './gateways/order';
import { AccountStore } from './account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { Order } from '~/types/api.types';
import { FulfilOrderInput } from '~/types/model';

@injectable()
export class OrderStore {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this, {
      setOrder: action,
      setIsLoadingOrder: action,
      setIsCancellingOrder: action,
      setCancelError: action,
      setLoadingError: action,
      setIsFulfillingOrder: action,
      setOrderCancelled: action,
      setFulfilOrderError: action,
      setOrderFulfilledSuccess: action,
      resetCancelError: action,
      resetFulfilOrderError: action,
    });
  }

  private _isLoadingOrder = false;

  get isLoadingOrder() {
    return this._isLoadingOrder;
  }

  setIsLoadingOrder = (value: boolean) => {
    this._isLoadingOrder = value;
  };

  private _order?: Order;

  get order(): Order | undefined {
    return this._order;
  }
  setOrder = (value: Order) => {
    this._order = value;
  };

  private _loadError?: Error;

  get loadError() {
    return this._loadError;
  }

  setLoadingError = (error: Error) => {
    this._loadError = error;
  };

  loadOrder = async ({ orderId }: { orderId: string }) => {
    try {
      this.setIsLoadingOrder(true);
      const result = await getOrder({ orderId });
      if (result.success) {
        this.setOrder(result.data);
      }
    } catch (err) {
      this.setLoadingError(err as Error);
    } finally {
      this.setIsLoadingOrder(false);
    }
  };

  private _isCancellingOrder = false;
  private _orderCancelled = false;

  get orderDeleted() {
    return this._orderCancelled;
  }

  get isCancellingOrder() {
    return this._isCancellingOrder;
  }

  setIsCancellingOrder = (value: boolean) => {
    this._isCancellingOrder = value;
  };

  setOrderCancelled = (value: boolean) => {
    this._orderCancelled = value;
  };

  private _cancelError?: Error;

  get cancelError() {
    return this._cancelError;
  }

  setCancelError = (error: Error) => {
    this._cancelError = error;
  };

  resetCancelError = () => {
    this._cancelError = undefined;
  };

  cancelOrder = async ({ orderId }: { orderId: string }) => {
    try {
      this.setIsCancellingOrder(true);
      const result = await cancelOrder({ orderId, order: { canceled: true } });
      if (result.success) {
        this.setOrderCancelled(true);
        this.loadOrder({ orderId });
      }
    } catch (err) {
      this.setCancelError(err as Error);
    } finally {
      this.setIsCancellingOrder(false);
    }
  };

  private _isFulfillingOrder = false;
  private _orderFulfilledSuccess = false;

  setOrderFulfilledSuccess = (value: boolean) => {
    this._orderFulfilledSuccess = value;
  };

  get orderFulfilledSuccess() {
    return this._orderFulfilledSuccess;
  }

  setIsFulfillingOrder = (value: boolean) => {
    this._isFulfillingOrder = value;
  };

  private _fulfillOrderError?: Error;

  setFulfilOrderError = (error: Error) => {
    this._fulfillOrderError = error;
  };

  resetFulfilOrderError = () => {
    this._fulfillOrderError = undefined;
  };

  get fulfilOrderError() {
    return this._fulfillOrderError;
  }

  get isFulfillingOrder() {
    return this._isFulfillingOrder;
  }

  fulfilOrder = async (input: FulfilOrderInput) => {
    try {
      this.setIsFulfillingOrder(true);
      const result = await fulfilOrder(input);

      if (result.success) {
        this.setOrderFulfilledSuccess(true);
        this.loadOrder({ orderId: result.data.orderId });
        return result.data;
      }
    } catch (err) {
      this.setFulfilOrderError(err as Error);
    } finally {
      this.setIsFulfillingOrder(false);
    }
  };
}
