import { Avatar as TamaguiAvatar } from 'tamagui';
import { getInitials } from '~/utils/initials';
import { BodyText } from '~/components/body-text';

export function Avatar({
  imageUrl,
  size = 26,
  name = '',
}: {
  imageUrl?: string;
  size?: number;
  name?: string;
}) {
  return (
    <TamaguiAvatar circular size={size}>
      <TamaguiAvatar.Image src={imageUrl} />
      <TamaguiAvatar.Fallback backgroundColor="$colorA" alignItems="center" justifyContent="center">
        <BodyText bold color="white">
          {getInitials(name)}
        </BodyText>
      </TamaguiAvatar.Fallback>
    </TamaguiAvatar>
  );
}
