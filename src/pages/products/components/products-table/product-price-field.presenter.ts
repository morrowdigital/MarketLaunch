import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { Product } from '~/types/swell.types';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

@injectable()
export class ProductPriceFieldPresenter {
  constructor() {
    makeAutoObservable(this);
  }

  getMinVariantPrice(product: Product) {
    const optPrices = product?.variants?.results.map((variant) => {
      return variant.price;
    });

    const prices = optPrices?.filter((price): price is number => {
      return price !== undefined;
    });

    if (prices?.length) {
      return `$${Math.min(...prices)}`;
    } else {
      return 'N/A';
    }
  }
}

export const useProductPriceFieldPresenter = () =>
  useDependency<ProductPriceFieldPresenter>(Symbol.for(Injectables.ProductPriceFieldPresenter));
