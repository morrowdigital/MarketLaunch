import { inject, injectable } from 'inversify';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependencyWithInit } from '~/utils/inversifyJS/use-dependency';
import { action, makeAutoObservable, runInAction } from 'mobx';
import { ToastThemedStore } from '~/components/toast-themed/toast-themed-store';
import { stripHeadStr } from '~/utils/strip-head-str';
import { uploadFile } from '~/state/gateways/files';
import { Variant } from 'swell-js';
import { FileCreateSwellResponse } from '~/types/swell.types';

@injectable()
export class ProductStockTableLinePresenter {
  constructor(
    @inject(Symbol.for(Injectables.ToastThemedStore)) private toastStore: ToastThemedStore
  ) {
    makeAutoObservable(this, {
      init: action,
      updateVariantSku: action,
      updateVariantStock: action,
      updateVariantPrice: action,
    });
  }

  isUploadingImage = false;
  private _variant?: Variant;

  init = (variant: Variant) => {
    this._variant = variant;
  };

  get variant() {
    return this._variant!;
  }

  updateVariantSku = (sku?: string) => {
    this.variant.sku = sku;
  };

  updateVariantStock = (stockStr?: string) => {
    const stock = Number(stockStr);
    if (Number.isNaN(stock)) {
      return this.toastStore.show('Invalid stock', 'Must be number', true);
    }

    this.variant.stockLevel = stock;
  };

  // TODO take into account the currency settings from Swell store
  updateVariantPrice = (priceStr?: string) => {
    if (priceStr === undefined) {
      this.variant.price = undefined;
      return;
    }

    const priceStripped = stripHeadStr('$', priceStr);
    const price = Number(priceStripped);

    if (Number.isNaN(price)) {
      return this.toastStore.show('Invalid stock', 'Must be number', true);
    }

    this.variant.price = price;
  };

  updateVariantImage = async (imageB64: string) => {
    let imageFile: FileCreateSwellResponse;
    try {
      imageFile = await uploadFile(imageB64);
    } catch {
      return this.toastStore.show('Error', 'Error updating variant image: ', true);
    }

    runInAction(() => {
      this.variant.images = [imageFile];
    });
  };

  get priceString() {
    if (this.variant?.price === undefined) {
      return '';
    }

    return '$ ' + this.variant.price.toFixed(2);
  }

  get stockString() {
    return String(this.variant?.stockLevel ?? 0);
  }
}

// create a new instance of the presenter and initialises the variantId
export const useProductStockTableLinePresenter = (variant: Variant) =>
  useDependencyWithInit<Variant, ProductStockTableLinePresenter>(
    Symbol.for(Injectables.ProductStockTableLinePresenter),
    variant
  );
