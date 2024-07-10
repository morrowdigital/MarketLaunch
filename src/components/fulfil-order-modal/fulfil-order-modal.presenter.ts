import { injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependency } from '~/utils/inversifyJS/use-dependency';

@injectable()
export class FulfilOrderModalPresenter {
  constructor() {
    makeAutoObservable(this, {
      setIsOpen: action,
    });
  }

  private _isOpen = false;

  get isOpen() {
    return this._isOpen;
  }

  setIsOpen = (value: boolean) => {
    this._isOpen = value;
  };

  toggle = () => {
    this.setIsOpen(!this.isOpen);
  };

  close = () => {
    this.setIsOpen(false);
  };

  handleOpenChange = (open: boolean, onClose: () => void) => {
    this.toggle();

    if (!open) {
      onClose();
    }
  };
}

export const useFulfilOrderModalPresenter = () =>
  useDependency<FulfilOrderModalPresenter>(Symbol.for(Injectables.FulfilOrderModalPresenter));
