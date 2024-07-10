import { Input, Label } from 'tamagui';
import { FormError } from '~/components/inline-link';
import { InputModeOptions, TextInputProps } from 'react-native';
import { BodyText } from '~/components/body-text';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  id: string;
  placeholder?: string;
  label: string;
  inputMode?: InputModeOptions;
  autoComplete?: TextInputProps['autoComplete'];
  error?: string;
  secureTextEntry?: boolean;
};
export function RegistrationTextInput({ id, label, error, ...rest }: Props) {
  return (
    <>
      <Label htmlFor={id}>
        <BodyText bold small>
          {label}
        </BodyText>
      </Label>
      <Input id={id} {...rest} />
      {Boolean(error) && <FormError>{error}</FormError>}
    </>
  );
}
