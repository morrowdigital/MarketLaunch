import 'reflect-metadata';
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import 'raf/polyfill';

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { Provider } from '../tamagui-conf/provider';
import Head from 'next/head';
import React, { startTransition } from 'react';
import type { SolitoAppProps } from 'solito';
import { initMobx } from '~/utils/init-mobx';
import { Theme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';
import { ToastThemed } from '~/components/toast-themed/toast-themed';
import { appConfig } from '~/app-config/app-config';

initMobx();

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>{appConfig.meta.title}</title>
        <meta name="description" content={appConfig.meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <ToastProvider>
          <Component {...pageProps} />
          <ToastThemed />
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider
      forcedTheme={'light'}
      onChangeTheme={(next?: string) => {
        if (next === 'dark' || next === 'light') {
          startTransition(() => {
            setTheme(next);
          });
        }
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        <Theme name="light">
          <div style={{ fontFamily: 'DM Sans' }}>{children}</div>
        </Theme>
      </Provider>
    </NextThemeProvider>
  );
}

export default MyApp;

// TODO add Error boundaries in pages to catch errors
