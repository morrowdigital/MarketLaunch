import { inject, injectable } from 'inversify';
import { AccountStore } from '~/state/account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

@injectable()
export class SettingsPresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) private accountStore: AccountStore) {}

  get isBuyer() {
    return this.accountStore.account?.group === 'buyers';
  }

  get isVendor() {
    return !this.isBuyer;
  }
}

export function useSettingsPresenter() {
  return useDependency<SettingsPresenter>(Symbol.for(Injectables.SettingsPresenter));
}
