import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { isBrowser } from './is-web';

export function initMobx() {
  const isClientSide = isBrowser();
  enableStaticRendering(!isClientSide);

  configure({
    enforceActions: isClientSide ? 'always' : 'never',
    computedRequiresReaction: isClientSide,
    reactionRequiresObservable: isClientSide,
    observableRequiresReaction: isClientSide,
    disableErrorBoundaries: isClientSide,
  });
}
