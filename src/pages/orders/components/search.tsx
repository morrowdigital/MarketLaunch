import { XStack } from 'tamagui';
import { DarkButton } from '~/components/dark-button';
import { FilterInput } from '~/components/input';
import { FilterIcon } from '~/components/icons/icons';
import { ComponentProps } from 'react';
import { SearchBar } from '~/pages/orders/components/search-bar';

type Props = ComponentProps<typeof FilterInput> & {
  // If you are not passing this and are about to make it
  // optional, you should use SearchBar instead!
  onFilterPress: () => void;
  onDebounce?: (value: string) => void;
  debounce?: number;
};

export const Search = function ({
  value,
  onFilterPress,
  onChangeText,
  onDebounce,
  debounce = 1000,
  ...props
}: Props) {
  return (
    <XStack>
      <SearchBar
        value={value}
        onChangeText={onChangeText}
        onDebounce={onDebounce}
        debounce={debounce}
        {...props}
      />
      <DarkButton
        onPress={onFilterPress}
        icon={<FilterIcon dark />}
        marginLeft="$4"
        borderRadius="$4"
      >
        Filter
      </DarkButton>
    </XStack>
  );
};
