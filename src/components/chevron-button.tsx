import { styled, Button } from 'tamagui';
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';

export const ChevronButtonLeft = styled(Button, {
  backgroundColor: '$colorA',
  color: 'white',
  icon: ChevronLeft,
  padding: '$2',
  height: 24,
});

export const ChevronButtonRight = styled(Button, {
  icon: ChevronRight,
  color: 'white',
  backgroundColor: '$colorA',
  padding: '$2',
  height: 24,
});
