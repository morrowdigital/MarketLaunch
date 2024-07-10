import { BodyText } from '~/components/body-text';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { GetProps } from 'tamagui';

type LinkThemedProps = LinkProps & { children: ReactNode } & GetProps<typeof BodyText>;
export const LinkThemed = (props: LinkThemedProps) => (
  <BodyText {...props}>
    <Link style={{ textDecoration: 'none' }} href={props.href}>
      {props.children}
    </Link>
  </BodyText>
);
