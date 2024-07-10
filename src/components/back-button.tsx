import { useRouter } from 'next/router';
import { DarkButton } from './dark-button';
import { ChevronLeftIcon } from './icons/icons';
import { Routes } from '~/types/model';
import { useEffect } from 'react';

type Props = {
  returnTo: Routes;
};

export function BackButton({ returnTo }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(returnTo);
  }, [router, returnTo]);

  return (
    <DarkButton
      padding="$2"
      borderRadius="$5"
      icon={<ChevronLeftIcon dark />}
      onPress={() => router.replace(returnTo)}
    >
      Back
    </DarkButton>
  );
}
