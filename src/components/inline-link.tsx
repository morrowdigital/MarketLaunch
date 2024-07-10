import { FontWeightTokens, SizableText, styled } from 'tamagui';
import Link, { LinkProps } from 'next/link';

type Props = LinkProps & {
  fontWeight?: FontWeightTokens;
  children: string;
  color?: string;
};

export const InlineLink = ({ fontWeight, children, ...props }: Props) => (
  <Link {...props}>
    <SizableText color={props.color} fontWeight={fontWeight ?? '700'}>
      {children}
    </SizableText>
  </Link>
);

export const FormError = styled(SizableText, {
  color: '$statusRedBg',
  size: '$4',
});
