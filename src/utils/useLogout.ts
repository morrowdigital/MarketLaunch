import { useToastController } from '@tamagui/toast';
import { useRouter } from 'next/router';
import { Routes } from '~/types/model';

export function useLogoutHandler(logoutFunc: () => Promise<void>) {
  const { show } = useToastController();
  const router = useRouter();

  return async () => {
    try {
      router.push(Routes.Login).then();
      await logoutFunc();
    } catch {
      show('Error', { message: 'Failed to logout', additionalInfo: { error: true } });
    }
  };
}
