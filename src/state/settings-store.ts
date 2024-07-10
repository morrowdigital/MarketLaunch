import { injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';
import { getSettings } from './gateways/settings';
import { Settings } from 'swell-js';
import { FetchSettingsResponse } from '~/types/api.types';

// Todo: Look into making class generic

@injectable()
export class SettingsStore {
  constructor() {
    makeAutoObservable(this);
    runInAction(() => {
      this.loadSettings().then();
    });
  }

  private _isLoadingSettings = false;
  private _settings?: FetchSettingsResponse;

  get settings() {
    return this._settings;
  }

  get shippingSettings() {
    const filteredSettings = this.settings?.results.filter((settings: Settings) => {
      return Boolean(settings?.carriers);
    });

    return filteredSettings?.[0];
  }

  setSettings = (settings: FetchSettingsResponse) => {
    this._settings = settings;
  };

  get isLoadingSettings() {
    return this._isLoadingSettings;
  }

  setIsLoadingSettings = (value: boolean) => {
    this._isLoadingSettings = value;
  };

  loadSettings = async () => {
    try {
      this.setIsLoadingSettings(true);
      const result = await getSettings({ page: 0, limit: 10 });
      if (result.success) {
        this.setSettings(result.data);
      }
    } finally {
      this.setIsLoadingSettings(false);
    }
  };
}
