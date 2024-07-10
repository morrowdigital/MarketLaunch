import { SizableText } from 'tamagui';

type StatusProps = {
  message: string;
  backgroundColor: string;
  color: string;
};
export const Status = ({ message, backgroundColor, color }: StatusProps) => (
  <SizableText
    fontSize="$4"
    backgroundColor={backgroundColor}
    color={color}
    paddingHorizontal={6}
    borderRadius={20}
  >
    {message}
  </SizableText>
);
