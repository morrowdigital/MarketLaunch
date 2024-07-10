import { YStack, XStack, Form, Label, Input, H2 } from 'tamagui';
import { observer } from 'mobx-react-lite';
import { ImagePicker } from '~/components/image-picker';
import { BodyText } from '~/components/body-text';
import { ElevatedCard } from '~/components/elevated-card';
import { DarkButton } from '~/components/dark-button';
import { useVendorFormPresenter } from './vendor-form.presenter';
import { SpinnerThemed } from '~/components/spinner-themed';
import { useEffect } from 'react';

export const VendorForm = observer(() => {
  const { data, setValue, setTouched, save, isSavingVendor, handleImageUpload, cleanup } =
    useVendorFormPresenter();

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <Form onSubmit={() => {}}>
      <H2>Vendor Details</H2>
      <ElevatedCard padding={15} minWidth={286} marginTop="$4" elevation={12}>
        <YStack alignItems="center">
          <ImagePicker
            onImagePicked={handleImageUpload}
            imageUrl={data?.vendorLogo ? data?.vendorLogo : undefined}
          />
          <Label htmlFor="image">
            <BodyText bold small>
              Vendor Logo
            </BodyText>
          </Label>
        </YStack>

        <Label htmlFor="businessName">
          <BodyText bold small>
            Business name (optional)
          </BodyText>
        </Label>

        <Input
          value={data?.businessName || ''}
          id="businessName"
          onChangeText={(text) => setValue('businessName', text)}
          onBlur={() => setTouched('businessName', true)}
          placeholder="Business Name"
          autoComplete="name"
        />

        <XStack marginTop={37}>
          <DarkButton
            light
            paddingHorizontal={20}
            borderRadius={'$4'}
            onPress={save}
            icon={isSavingVendor ? <SpinnerThemed /> : null}
          >
            Save
          </DarkButton>
        </XStack>
      </ElevatedCard>
    </Form>
  );
});
