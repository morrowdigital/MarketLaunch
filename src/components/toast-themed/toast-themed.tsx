import React, { useEffect } from 'react';
import { useToastState, Toast, useToastController } from '@tamagui/toast';
import { ToastThemedStore } from '~/components/toast-themed/toast-themed-store';
import { getRootContainer } from '~/utils/inversifyJS/containers';
import { Injectables } from '~/utils/inversifyJS/injectables';

export type ToastController = ReturnType<typeof useToastController>;

export type CustomToastData = { additionalInfo?: { error?: boolean } };
export const ToastThemed = () => {
  const toast = useToastState();
  const controller = useToastController();

  useEffect(() => {
    const toastStore = getRootContainer().get<ToastThemedStore>(
      Symbol.for(Injectables.ToastThemedStore)
    );
    toastStore.init(controller);
  }, [controller]);

  // only show the component if it's present and not handled by native toast
  if (!toast || toast.isHandledNatively) {
    return null;
  }
  const { backgroundColor, color } = (toast as typeof toast & CustomToastData).additionalInfo?.error
    ? { backgroundColor: '$redOnWhite', color: '$statusRedFg' }
    : { backgroundColor: '$statusGreenBg', color: '$statusGreenFg' };

  return (
    <Toast key={toast.id} backgroundColor={backgroundColor}>
      <Toast.Title color={color}>{toast.title}</Toast.Title>
      <Toast.Description color={color}>{toast.message}</Toast.Description>
    </Toast>
  );
};
