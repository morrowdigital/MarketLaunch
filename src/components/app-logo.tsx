import { Stack } from 'tamagui';
import Image from 'next/image';
import { appConfig } from '~/app-config/app-config';

type AppLogoProps = {
  src?: string;
  alt?: string;
  width: number;
  height: number;
};
export function AppLogo({
  src = appConfig.theme.logo,
  alt = 'App Logo',
  width,
  height,
}: AppLogoProps) {
  return (
    <Stack width={width} height={height} position="relative">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        priority
        sizes={`(max-width: ${width}px) ${width}px`}
      />
    </Stack>
  );
}
