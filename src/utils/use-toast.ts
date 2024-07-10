import { useToastController } from '@tamagui/toast';
import { useEffect } from 'react';

export function useErrorToast({
  error,
  message,
  reset,
}: {
  error?: Error;
  message: string;
  reset?: () => void;
}) {
  const { show } = useToastController();

  useEffect(() => {
    if (error) {
      show('Error', { message: message, additionalInfo: { error: true } });
      reset?.();
    }
  }, [reset, show, message, error]);
}

export function useToast({
  isVisible,
  message,
  reset,
}: {
  isVisible?: boolean;
  message: string;
  reset?: () => void;
}) {
  const { show } = useToastController();

  useEffect(() => {
    if (isVisible) {
      show('Success', { message: message });
      reset?.();
    }
  }, [show, reset, isVisible, message]);
}
