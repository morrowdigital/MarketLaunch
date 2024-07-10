import { Stack, YStack, XStack } from 'tamagui';
import { InputField } from '../input-field';
import { DarkButton } from '../dark-button';
import { useVariantFormPresenter } from './variant-form.presenter';
import { observer } from 'mobx-react-lite';
import { BodyText } from '../body-text';
import { useEffect } from 'react';
import { X } from '@tamagui/lucide-icons';
import { ProductOption } from 'swell-js';
import { useProductFormPresenterContext } from '../product-form/product-form.presenter';

type Props = {
  option?: ProductOption;
  onSave: () => void;
};

export const VariantForm = observer(function VariantForm({ onSave, option: initialOption }: Props) {
  const productFormPresenter = useProductFormPresenterContext();
  const {
    init,
    option,
    setOptionName,
    valueName,
    setValueName,
    addNewValue,
    removeOptionValue,
    hasVariantOptions,
    saveOption,
    cleanup,
  } = useVariantFormPresenter();

  useEffect(
    () => init(productFormPresenter, initialOption || {}),
    [init, productFormPresenter, initialOption]
  );
  useEffect(() => cleanup, [cleanup]);

  // Wait until useEffect fires and initializes the presenter.
  if (option === undefined) {
    return <></>;
  }

  return (
    <YStack space="$4">
      <InputField
        label="Variant name"
        value={option?.name || ''}
        onChangeText={setOptionName}
      ></InputField>
      <XStack alignItems="flex-end">
        <InputField
          label="Variant options"
          value={valueName}
          flex={1}
          onChangeText={setValueName}
        />
        <DarkButton square marginLeft="$2" onPress={addNewValue} disabled={!option}>
          Add
        </DarkButton>
      </XStack>

      {
        <XStack space="$2">
          {option.values!.map((value, index) => (
            <XStack
              space="$2"
              key={index}
              borderRadius={20}
              alignItems="center"
              paddingVertical="$1"
              alignContent="center"
              paddingHorizontal="$2"
              backgroundColor="$colorC"
            >
              <BodyText color="white">{value.name}</BodyText>
              <Stack onPress={() => removeOptionValue(value.name!)} cursor="pointer">
                <X width={22} height={22} color="white" />
              </Stack>
            </XStack>
          ))}
        </XStack>
      }

      {!hasVariantOptions && (
        <BodyText color="$red10">Add a variant option before creating your variant!</BodyText>
      )}

      <XStack>
        <DarkButton
          borderRadius="$6"
          disabled={!hasVariantOptions}
          onPress={() => saveOption(onSave)}
        >
          Save
        </DarkButton>
      </XStack>
    </YStack>
  );
});
