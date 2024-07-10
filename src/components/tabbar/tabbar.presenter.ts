import { injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { TabbarTab } from './tabbar';

@injectable()
export class TabbarPresenter {
  constructor() {
    makeAutoObservable(this, {
      setSelectedTabIndex: action,
    });
  }

  private _selectedTabIndex = 0;
  get selectedTabIndex() {
    return this._selectedTabIndex;
  }

  setSelectedTabIndex = (value: number) => {
    this._selectedTabIndex = value;
  };

  handleTabSelection = (tab: TabbarTab, callback: (tab: TabbarTab) => void) => {
    return () => {
      this.setSelectedTabIndex(tab.index);
      callback(tab);
    };
  };
}
