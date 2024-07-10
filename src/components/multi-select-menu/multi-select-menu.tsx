import { Checkbox, Stack, XStack } from 'tamagui';
import { ActionMenu } from '~/components/action-menu';
import { Check } from '@tamagui/lucide-icons';
import { FilterIcon } from '~/components/icons/icons';
import { BodyText } from '~/components/body-text';
import { observer } from 'mobx-react-lite';
import {
  MultiSelectMenuCallback,
  useMultiSelectMenuPresenter,
} from './multi-select-menu.presenter';

type Props = {
  entries: [string, string][];
  onOpenChange: MultiSelectMenuCallback;
};

export const MultiSelectMenu = observer(function MultiSelectMenu({
  entries,
  onOpenChange: callback,
}: Props) {
  const { onOpenChange, isSelected, addSelected, removeSelected } =
    useMultiSelectMenuPresenter(callback);

  return (
    <ActionMenu onOpenChange={onOpenChange} triggerText="Filter" triggerIcon={<FilterIcon dark />}>
      <Stack paddingHorizontal="$2">
        {entries.map(([value, label], index) => (
          <XStack space paddingVertical="$2" width="100%" key={index}>
            <BodyText color="white">{label}</BodyText>
            <Checkbox
              marginLeft="auto"
              checked={isSelected(value)}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  addSelected(value);
                } else if (checked === false) {
                  removeSelected(value);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
          </XStack>
        ))}
      </Stack>
    </ActionMenu>
  );
});
