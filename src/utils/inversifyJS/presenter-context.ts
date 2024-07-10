import { Context, createContext, useContext } from 'react';

export function createPresenterContext<T>() {
  return createContext<T | undefined>(undefined);
}

export function createPresenterContextHook<T>(context: Context<T | undefined>, name?: string) {
  return () => {
    const presenter = useContext(context);

    if (!presenter) {
      throw new Error(`No context value found for presenter: ${name}`);
    }

    return presenter;
  };
}
