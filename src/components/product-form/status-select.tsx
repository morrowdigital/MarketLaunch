import { Select } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import { ProductStockStatus } from '~/types/model';

import { productStates } from '~/utils/product-states';

type Props = {
  value?: ProductStockStatus;
  onValueChange: (value: ProductStockStatus) => void;
};

export function StatusSelect({ value: currentValue, onValueChange }: Props) {
  return (
    <Select onValueChange={onValueChange}>
      <Select.Trigger iconAfter={ChevronDown}>
        <Select.Value>{currentValue ? productStates[currentValue] : undefined}</Select.Value>
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            {Object.entries(productStates).map(([value, label], index) => (
              <Select.Item value={value} index={index} key={index}>
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
}
