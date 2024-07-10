import { injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependencyWithInit } from '~/utils/inversifyJS/use-dependency';

export type MultiSelectMenuCallback = (
  open: boolean,
  hasChanged: boolean,
  selected?: Set<string>
) => void;

@injectable()
export class MultiSelectMenuPresenter {
  constructor() {
    makeAutoObservable(this, {
      init: action,
    });
  }

  _callback?: MultiSelectMenuCallback;

  init = (callback: MultiSelectMenuCallback) => {
    this._callback = callback;
  };

  private _selected?: Set<string>;
  private _hasChanged: boolean = false;

  isSelected = (value: string) => !!this._selected?.has(value);

  addSelected = (value: string) => {
    if (!this._selected) {
      this._selected = new Set();
    }

    this._hasChanged = true;
    this._selected.add(value);
  };

  removeSelected = (value: string) => {
    if (this._selected) {
      this._hasChanged = true;
      this._selected.delete(value);
      if (this._selected.size == 0) {
        this._selected = undefined;
      }
    }
  };

  onOpenChange = (open: boolean) => {
    this._callback!(open, this._hasChanged, this._selected);
  };
}

export const useMultiSelectMenuPresenter = (callback: MultiSelectMenuCallback) =>
  useDependencyWithInit<MultiSelectMenuCallback, MultiSelectMenuPresenter>(
    Symbol.for(Injectables.MultiSelectMenuPresenter),
    callback
  );
