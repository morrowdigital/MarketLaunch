import {
  dataUriPerson,
  dataUriEnvelope,
  dataUriPhone,
  dataUriPin,
  dataUriBill,
  dataUriCard,
  dataUriChevronUp,
  dataUriChevronLeft,
  dataUriImageOutline,
  dataUriPlus,
  dataUriProduct,
  dataUriAddImage,
  dataUriAddImageSmall,
  dataUriFilter,
  dataUriSettings,
} from './uri-generators';
import { getTokenValue } from 'tamagui';
import Image from 'next/image';
import { dataUriPayouts } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/uri-generators';

export const enum Icons {
  AddImage = 'add-image',
  AddImageSmall = 'add-image-small',
  Bill = 'bill',
  Card = 'card',
  ChevronLeft = 'chevoron-left',
  ChevronUp = 'chevron-up',
  Envelope = 'envelope',
  Filter = 'filter',
  ImageOutline = 'image-outline',
  Payouts = 'Payouts',
  Person = 'person',
  Plus = 'plus',
  Phone = 'phone',
  Pin = 'pin',
  Product = 'product',
  Settings = 'settings',
}

export const iconDefinitions: Record<
  Icons,
  { uriGenerator: (color: string) => string; height: number; width: number; alt: string }
> = {
  [Icons.AddImage]: {
    uriGenerator: dataUriAddImage,
    height: 120,
    width: 121,
    alt: 'add image icon',
  },
  [Icons.AddImageSmall]: {
    uriGenerator: dataUriAddImageSmall,
    height: 41,
    width: 42,
    alt: 'small add image icon',
  },
  [Icons.Bill]: { uriGenerator: dataUriBill, height: 17, width: 18, alt: 'bill icon' },
  [Icons.Card]: { uriGenerator: dataUriCard, height: 13, width: 27, alt: 'card icon' },
  [Icons.ChevronLeft]: {
    uriGenerator: dataUriChevronLeft,
    height: 24,
    width: 24,
    alt: 'chevron left icon',
  },
  [Icons.ChevronUp]: { uriGenerator: dataUriChevronUp, height: 8, width: 13, alt: 'chevron up' },
  [Icons.Envelope]: { uriGenerator: dataUriEnvelope, height: 11, width: 16, alt: 'envelope icon' },
  [Icons.Filter]: { uriGenerator: dataUriFilter, height: 12, width: 17, alt: 'filter icon' },
  [Icons.ImageOutline]: {
    uriGenerator: dataUriImageOutline,
    height: 120,
    width: 120,
    alt: 'image outline icon',
  },
  [Icons.Person]: { uriGenerator: dataUriPerson, height: 16, width: 16, alt: 'person icon' },
  [Icons.Phone]: { uriGenerator: dataUriPhone, height: 16, width: 16, alt: 'person icon' },
  [Icons.Pin]: { uriGenerator: dataUriPin, height: 19, width: 14, alt: 'pin icon' },
  [Icons.Plus]: { uriGenerator: dataUriPlus, height: 50, width: 51, alt: 'plus icon' },
  [Icons.Product]: { uriGenerator: dataUriProduct, height: 22, width: 22, alt: 'product icon' },
  [Icons.Settings]: { uriGenerator: dataUriSettings, height: 22, width: 22, alt: 'settings icon' },
  [Icons.Payouts]: { uriGenerator: dataUriPayouts, height: 22, width: 22, alt: 'payouts icon' },
};

export type IconProps = {
  icon: Icons;
  scale?: number;
  dark?: boolean;
};

export function Icon({ icon, scale = 1, dark }: IconProps) {
  // The # character is escaped because it has special significance in URLs
  // as a fragment identifier. The text after the identifier is not sent to the server
  // so this prevents images from loading correctly.

  const colorA = getTokenValue('$colorA')?.replace('#', '%23');
  const color = dark ? 'white' : colorA;

  const { uriGenerator, height, width, alt } = iconDefinitions[icon];

  return (
    <Image src={uriGenerator(color)} height={height * scale} width={width * scale} alt={alt} />
  );
}

export function AddImageSmallIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.AddImageSmall} {...props} />;
}

export function AddImageIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.AddImage} {...props} />;
}

export function BillIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Bill} {...props} />;
}

export function CardIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Card} {...props} />;
}

export function ChevronLeftIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.ChevronLeft} {...props} />;
}

export function ChevronUpIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.ChevronUp} {...props} />;
}

export function EnvelopeIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Envelope} {...props} />;
}

export function FilterIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Filter} {...props} />;
}

export function ImageOutlineIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.ImageOutline} {...props} />;
}

export function PayoutsIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Payouts} {...props} />;
}

export function PersonIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Person} {...props} />;
}

export function PhoneIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Phone} {...props} />;
}

export function PinIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Pin} {...props} />;
}

export function PlusIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Plus} {...props} />;
}

export function ProductIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Product} {...props} />;
}

export function SettingsIcon(props: Omit<IconProps, 'icon'>) {
  return <Icon icon={Icons.Settings} {...props} />;
}
