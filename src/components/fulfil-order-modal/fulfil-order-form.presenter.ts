import { inject, injectable } from 'inversify';
import { action, IReactionDisposer, makeAutoObservable, reaction } from 'mobx';
import { test, enforce } from 'vest';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { format } from 'date-fns';
import { validateForm } from '~/utils/validate-form';
import { OrderStore } from '~/state/order-store';
import { SettingsStore } from '~/state/settings-store';
import { CarrierSettings, ServiceSettings } from '~/types/model';

type FulfilOrderFormData = {
  carrier?: string;
  deliveryDate?: string;
  trackingURL?: string;
};
type FulfilOrderFormErrors = Partial<Record<keyof FulfilOrderFormData, { errors: string[] }>>;

const validator = (formData: FulfilOrderFormData) => {
  // UK Short date format takes the form of day/month/year. For example: 24/07/2023

  const ukShortDateFormatRegex = /^(?:(?:0?[1-9]|1\d|2\d|3[0-1])\/(?:0?[1-9]|1[0-2])\/(?:\d{4}))$/;
  const urlRegex =
    /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[\w.-]*)*\/?(\?[\w-]+=[\w.%&]*)?(#[\w-]*)?$/i;

  test('carrier', 'Courier is required and must be valid', () => {
    enforce(formData.carrier).isNotEmpty();
  });

  test('deliveryDate', 'Delivery date must be a valid date', () => {
    if (formData.deliveryDate && formData.deliveryDate?.length > 0) {
      enforce(formData.deliveryDate).matches(ukShortDateFormatRegex);
    }
  });

  test('trackingURL', 'Tracking URL must be a valid URL', () => {
    if (formData.trackingURL && formData.trackingURL?.length > 0) {
      enforce(formData.trackingURL).matches(urlRegex);
    }
  });
};

@injectable()
export class FulfilOrderFormPresenter {
  private _reactionDisposer: IReactionDisposer | null = null;

  constructor(
    @inject(Symbol.for(Injectables.OrderStore)) private orderStore: OrderStore,
    @inject(Symbol.for(Injectables.SettingsStore)) private settingsStore: SettingsStore
  ) {
    makeAutoObservable(this, {
      setCarrier: action,
      setFormErrors: action,
      setIsValid: action,
      setDeliveryDate: action,
      setOrderFulfilledSuccess: action,
      setTrackingURL: action,
    });

    reaction(
      () => this.formData,
      (_formData) => {
        this.validate();
      }
    );
  }
  private _carrier?: string;

  get carrier() {
    return this._carrier;
  }

  setCarrier = (value: string) => {
    this._carrier = value;
  };

  private _deliveryDate: string = format(new Date(), 'dd/MM/yyyy');

  setDeliveryDate = (value: string) => {
    this._deliveryDate = value;
  };

  get deliveryDate() {
    return this._deliveryDate;
  }

  get formData() {
    return {
      carrier: this.carrier,
      deliveryDate: this.deliveryDate,
      trackingURL: this.trackingURL,
    };
  }

  private _isValid: boolean = false;

  setIsValid = (value: boolean) => {
    this._isValid = value;
  };

  get isValid() {
    return this._isValid;
  }

  private _trackingURL?: string;

  setTrackingURL = (value: string) => {
    this._trackingURL = value;
  };

  get trackingURL() {
    return this._trackingURL;
  }

  validate = () => {
    const result = validateForm(this.formData, validator);
    this.setIsValid(result.errorCount === 0);
    this.setFormErrors(result.tests);
  };

  private _formErrors?: FulfilOrderFormErrors;

  get formErrors() {
    return this._formErrors;
  }

  setFormErrors = (errors: FulfilOrderFormErrors) => {
    this._formErrors = errors;
  };

  save = () => {
    this.fulfilOrder();
  };

  get shippingSettings() {
    return this.settingsStore.shippingSettings;
  }

  get order() {
    return this.orderStore.order;
  }

  get serviceOptions() {
    return ((this.shippingSettings?.services ?? []) as ServiceSettings[]).map((service) => ({
      value: service.id,
      label: service.name,
    }));
  }

  get carrierOptions() {
    return ((this.shippingSettings?.carriers ?? []) as CarrierSettings[]).map((carrier) => ({
      value: carrier.id,
      label: carrier.name,
    }));
  }

  get isFulfillingOrder() {
    return this.orderStore.isFulfillingOrder;
  }

  get orderFulfilledSuccess() {
    return this.orderStore.orderFulfilledSuccess;
  }

  setOrderFulfilledSuccess = this.orderStore.setOrderFulfilledSuccess;

  fulfilOrder = async () => {
    const items = this.order?.items?.map((item) => ({
      orderItemId: item.id!,
      productId: item.product!.id!,
      quantity: item.quantity!,
    }));
    if (items) {
      await this.orderStore.fulfilOrder({
        serviceName: 'Standard Shipping',
        notes: this.order?.notes || '',
        service: 'standard',
        carrier: this.carrier,
        trackingCode: this.trackingURL,
        destination: this.order?.shipping,
        orderId: this.order!.id!,
        items,
      });
    }
  };

  cleanup = () => {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = null;
    }
  };
}

export const useFulfilOrderFormPresenter = () =>
  useDependency<FulfilOrderFormPresenter>(Symbol.for(Injectables.FulfilOrderFormPresenter));
