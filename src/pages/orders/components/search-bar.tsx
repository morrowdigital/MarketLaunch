import { FilterInput } from '~/components/input';
import { ComponentProps, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

type Props = ComponentProps<typeof FilterInput> & {
  onDebounce?: (value: string) => void;
  debounce?: number;
};

export const SearchBar = function ({
  placeholder = 'Search',
  value,
  onChangeText,
  onDebounce,
  debounce = 1000,
  ...props
}: Props) {
  const [debouncedValue] = useDebounce(value, debounce);

  useEffect(() => {
    onDebounce?.(debouncedValue ?? '');
  }, [onDebounce, debouncedValue]);

  return (
    <FilterInput
      flex={1}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...props}
    />
  );
};
