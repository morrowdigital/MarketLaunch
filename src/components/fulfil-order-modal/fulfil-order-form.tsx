import { YStack, XStack, Spinner } from 'tamagui';
import { DarkButton } from '../dark-button';
import { observer } from 'mobx-react-lite';
import { InputField } from '../input-field';
import { useFulfilOrderFormPresenter } from './fulfil-order-form.presenter';
import { FormErrorList } from '../form-error-list';
import { useEffect } from 'react';

export const FulfilOrderForm = observer(function FulfilOrderForm() {
  const {
    isFulfillingOrder,
    setCarrier,
    setDeliveryDate,
    setTrackingURL,
    trackingURL,
    deliveryDate,
    save,
    isValid,
    formErrors,
    cleanup,
  } = useFulfilOrderFormPresenter();

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <YStack space="$4">
      <YStack>
        <FormErrorList errors={formErrors?.carrier?.errors} />

        <InputField onChangeText={setCarrier} label="Courier Name" />
      </YStack>
      <YStack>
        <FormErrorList errors={formErrors?.deliveryDate?.errors} />
        <InputField label="Delivery Date" value={deliveryDate} onChangeText={setDeliveryDate} />
      </YStack>
      <YStack>
        <FormErrorList errors={formErrors?.trackingURL?.errors} />
        <InputField label="Tracking URL" value={trackingURL} onChangeText={setTrackingURL} />
      </YStack>
      <XStack>
        <DarkButton
          disabled={!isValid}
          icon={isFulfillingOrder ? <Spinner /> : null}
          onPress={save}
        >
          Save
        </DarkButton>
      </XStack>
    </YStack>
  );
});
