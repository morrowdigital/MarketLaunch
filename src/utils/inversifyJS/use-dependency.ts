import { useCallback, useEffect, useRef, useState } from 'react';

import { interfaces } from 'inversify';
import { getRootContainer } from './containers';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export function useDependency<T>(type: symbol, container = getRootContainer()): T {
  const [dependency] = useState(() => container.get(type as ServiceIdentifier) as T);

  return dependency;
}

type Initializer<T> = (args: T) => void; // T is the type of arguments the 'init' member method takes

// retrieves a dependency and automatically calls its 'init' method to initialise with some value
export function useDependencyWithInit<I, T extends { init: Initializer<I>; cleanUp?: () => void }>(
  type: symbol,
  initArgs: I,
  container = getRootContainer()
): T {
  const getInstance = useCallback(() => {
    const dep = container.get(type as ServiceIdentifier) as T;
    dep.init(initArgs);

    return dep;
  }, [type, initArgs, container]);

  // We don't want to return null as dependency, but also we don't want to re-run the init method
  // on the first render with useEffect.
  const instanceRef = useRef<T | null>(null);
  const firstRenderRef = useRef(true);

  if (instanceRef.current === null) {
    // we init the first instance
    instanceRef.current = getInstance();
  }

  useEffect(() => {
    if (firstRenderRef.current) {
      // don't re-run the init method on the first render
      firstRenderRef.current = false;
      return;
    }

    instanceRef.current?.cleanUp?.();
    instanceRef.current = getInstance();
  }, [initArgs, getInstance]);

  return instanceRef.current;
}
