import { TamaguiProvider, TamaguiProviderProps } from 'tamagui';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { useColorScheme } from 'react-native';

import { CustomToast } from '~/components/custom-toast';
import config from './tamagui.config';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme();
  return (
    <TamaguiProvider
      config={config}
      disableInjectCSS
      defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider swipeDirection="horizontal" native="mobile">
        {children}

        <CustomToast />
        <ToastViewport left={0} right={0} top={2} />
      </ToastProvider>
    </TamaguiProvider>
  );
}
