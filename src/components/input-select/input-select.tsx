import { Select } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import { SelectOption } from '~/types/model';

type Props = {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
};

export function InputSelect({ options, value, onValueChange }: Props) {
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <Select.Trigger iconAfter={ChevronDown}>
        <Select.Value placeholder="Select" />
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            {options.map((option, index) => (
              <Select.Item value={option.value} index={index} key={index}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
}
