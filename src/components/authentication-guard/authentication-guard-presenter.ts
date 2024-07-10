import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { isNode } from '~/utils/is-web';
import { AccountStore } from '~/state/account-store';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { Group } from '~/types/api.types';
import { AuthenticationStatuses } from '~/types/model';
import { useDependencyWithInit } from '~/utils/inversifyJS/use-dependency';

@injectable()
export class AuthenticationGuardPresenter {
  constructor(@inject(Symbol.for(Injectables.AccountStore)) public accountStore: AccountStore) {
    makeAutoObservable(this, {
      init: action,
    });
  }

  private _allowedGroups: Group[] = [];
  init = (groups: Group[]) => {
    this._allowedGroups = groups;
  };

  get status(): AuthenticationStatuses {
    // Because of SSR, the presenter in the backend should fall automatically to unauthenticated
    // This will cause mismatch between the server and the client. On the client the state is 'loading'
    // (having a session and checking it). So on SSR we consider that the component is always in loading state
    // to match the client behaviour
    if (!this.accountStore.isInitialised || isNode() || this.accountStore.isLoggingOut) {
      return 'loading';
    }

    if (!this.accountStore.isLoggedIn) {
      return 'unauthenticated';
    }

    if (
      this._allowedGroups.length > 0 &&
      !this._allowedGroups.includes(this.accountStore.account!.group! as Group)
    ) {
      return 'forbidden';
    }

    return 'allowed';
  }
}

export const useAuthenticationGuardPresenter = (groups: Group[]) =>
  useDependencyWithInit<Group[], AuthenticationGuardPresenter>(
    Symbol.for(Injectables.AuthenticationGuardPresenter),
    groups
  );
