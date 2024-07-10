import { styled, XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { NavListItemIcon } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-list-item-icon';
import { NavIcons } from '~/components/sidebar/sidebar-components/side-nav/side-nav-components/icons/nav-icons';

const NavListItemFrame = styled(XStack, {
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 14,
  justifyContent: 'flex-start',
  space: 11,
  cursor: 'pointer',
  variants: {
    dark: {
      true: {
        backgroundColor: '$colorA',
        color: 'white',
      },
      false: {
        backgroundColor: 'transparent',
        color: '$colorA',
      },
    },
  } as const,
  defaultVariants: {
    dark: false,
  },
});

const NavListItemText = styled(BodyText, {
  variants: {
    dark: {
      true: {
        color: 'white',
        fontWeight: '700',
      },
      false: {
        color: '$colorA',
      },
    },
  } as const,
});

type Props = { dark?: boolean; onPress?: () => void; label: string; icon: NavIcons };
export const NavListItem = ({ dark, onPress, label, icon }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Avoids tripping the recursion limiter
  const textElm = <NavListItemText dark={dark}>{label}</NavListItemText>;
  return (
    <NavListItemFrame dark={dark} onPress={onPress}>
      <XStack minWidth={21} alignItems="center" justifyContent="center">
        <NavListItemIcon dark={dark} icon={icon} />
      </XStack>
      {textElm}
    </NavListItemFrame>
  );
};
