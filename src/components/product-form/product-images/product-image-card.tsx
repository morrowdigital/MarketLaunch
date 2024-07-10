import { styled, Stack } from 'tamagui';
import { Trash2 } from '@tamagui/lucide-icons';
import { useState } from 'react';

export const Card = styled(Stack, {
  backgroundColor: 'white',
  padding: '$2',
  marginHorizontal: '$2.5',
  marginTop: '$2.5',
  marginRight: 0,
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$gray5',
});

type ProductImageCardProps = React.ComponentProps<typeof Stack> & {
  onClose: () => void;
};
export const ProductImageCard = ({ children, onClose, ...props }: ProductImageCardProps) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  return (
    <Card
      {...props}
      animation={'lazy'}
      opacity={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 1 }}
      onHoverIn={() => setShowCloseButton(true)}
      onHoverOut={() => setShowCloseButton(false)}
    >
      {showCloseButton && (
        <Stack
          position="absolute"
          backgroundColor={'white'}
          animation={'lazy'}
          opacity={1}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 1 }}
          right={10}
          top={10}
          cursor="pointer"
          zIndex={10}
          onPress={onClose}
        >
          <Trash2 size={'$2.5'} />
        </Stack>
      )}
      {children}
    </Card>
  );
};
