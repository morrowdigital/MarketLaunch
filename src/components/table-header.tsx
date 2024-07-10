import { XStack } from 'tamagui';
import { BodyText } from '~/components/body-text';

type Props = {
  titles: {
    width: string;
    name: string;
  }[];
};

export function Header({ titles }: Props) {
  return (
    <XStack borderBottomWidth={0.5} padding={'$4'} backgroundColor={'$colorB'}>
      {titles.map((title, index) => (
        <XStack width={title.width} key={index}>
          <BodyText bold>{title.name}</BodyText>
        </XStack>
      ))}
    </XStack>
  );
}
