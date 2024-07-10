import { LightButton } from '~/components/light-button';
import { Status } from '~/components/status';

type Props = {
  backgroundColor: string;
  textColor: string;
  onPress?: () => void;
  value: string;
};

export const ColoredField = function ({ backgroundColor, textColor, value, onPress }: Props) {
  return (
    <LightButton
      onPress={onPress}
      justifyContent="flex-start"
      alignItems="center"
      paddingHorizontal={0}
      cursor={onPress ? 'pointer' : 'unset'}
    >
      <Status backgroundColor={backgroundColor} color={textColor} message={value} />
    </LightButton>
  );
};
