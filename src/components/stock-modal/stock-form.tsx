import { YStack, XStack } from 'tamagui';
import { DarkButton } from '../dark-button';
import { observer } from 'mobx-react-lite';
import { InputSelect } from '../input-select/input-select';
import { BodyText } from '../body-text';
import { useStockFormPresenter } from './stock-form.presenter';
import { useEffect } from 'react';
import { Variant } from 'swell-js';
import { useProductFormPresenterContext } from '../product-form/product-form.presenter';

type Props = {
  variant?: Variant;
  onSave: () => void;
};

export const StockForm = observer(function StockForm({ onSave, variant }: Props) {
  const presenter = useProductFormPresenterContext();
  const {
    setVariant,
    saveVariant,
    productOptions,
    selectedOptionValueName,
    handleOptionValueChange,
    showAlreadyExists,
  } = useStockFormPresenter(presenter);

  useEffect(() => {
    if (variant) {
      setVariant(variant);
    }
  }, [setVariant, variant]);

  return (
    <YStack space="$4">
      {productOptions.map((option) => (
        <YStack key={option.id} space="$2">
          <BodyText bold>{option.name}</BodyText>
          <InputSelect
            onValueChange={handleOptionValueChange(option)}
            value={selectedOptionValueName(option.id!) || ''}
            options={
              option.values?.map((value) => ({
                value: value.id!,
                label: value.name!,
              })) || []
            }
          />
        </YStack>
      ))}

      {showAlreadyExists ? <BodyText color="$red10">Variant already exists</BodyText> : null}

      <XStack>
        <DarkButton
          borderRadius="$6"
          disabled={showAlreadyExists}
          onPress={() => saveVariant(onSave)}
        >
          Save
        </DarkButton>
      </XStack>
    </YStack>
  );
});
