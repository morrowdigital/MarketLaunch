import Image from 'next/image';
import { getTokenValue } from 'tamagui';
import {
  iconDefinitions,
  NavIcons,
} from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-icons';

type Props = {
  icon: NavIcons;
  scale?: number;
  dark?: boolean;
};
export function NavListItemIcon({ icon, scale = 1, dark }: Props) {
  // TODO: Merge with `Icon`, only difference is `iconDefinitions`.

  const colorA = getTokenValue('$colorA').replace('#', '%23');
  const color = dark ? 'white' : colorA;

  const { uriGenerator, height, width, alt } = iconDefinitions[icon];

  return (
    <Image src={uriGenerator(color)} height={height * scale} width={width * scale} alt={alt} />
  );
}
