import { FormSubmitResult, Routes } from '~/types/model';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAccountSubmit = (onFormSubmit: () => Promise<FormSubmitResult>) => {
  const { show } = useToastController();
  const { push, prefetch } = useRouter();

  useEffect(() => {
    prefetch(Routes.Login);
  }, [prefetch]);

  return async () => {
    const result = await onFormSubmit();

    if (result?.action === 'none') {
      return;
    }

    if (result?.action === 'error') {
      return show('Error', { message: result.error, additionalInfo: { error: true } });
    }

    if (result?.action === 'success') {
      show('Success', { message: 'Account created successfully' });
      await push(Routes.Login);
    }

    throw Error('Unexpected result.action value!');
  };
};
