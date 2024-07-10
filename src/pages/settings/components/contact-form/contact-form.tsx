import { observer } from 'mobx-react-lite';
import { Form, XStack, Stack, Input, Label, H2 } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { DarkButton } from '~/components/dark-button';
import { ElevatedCard } from '~/components/elevated-card';
import { useContactFormPresenter } from './contact-form.presenter';
import { SpinnerThemed } from '~/components/spinner-themed';
import { useEffect } from 'react';

export const ContactForm = observer(() => {
  const { data, setValue, touched, errors, save, isSavingContact, cleanup } =
    useContactFormPresenter();

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <Form onSubmit={() => {}}>
      <H2>Contact Details</H2>
      <ElevatedCard padding={15} minWidth={286} marginTop="$4" elevation={12}>
        <Stack marginTop={20}>
          <Label htmlFor="contactName">
            <BodyText bold small>
              Contact name
            </BodyText>
          </Label>
          {Boolean(touched?.name) && (
            <BodyText color="$red10">{errors?.name?.errors?.[0]}</BodyText>
          )}
          <Input
            value={data?.name || ''}
            onChangeText={(text) => setValue('name', text)}
            id="contactName"
            placeholder="Contact Name"
            autoComplete="name"
          />

          <Label htmlFor="contactEmail">
            <BodyText bold small>
              Contact email
            </BodyText>
          </Label>
          {Boolean(touched?.email) && (
            <BodyText color="$red10">{errors?.email?.errors?.[0]}</BodyText>
          )}
          <Input
            value={data?.email || ''}
            onChangeText={(text) => setValue('email', text)}
            id="contactEmail"
            placeholder="Contact Email"
            autoComplete="email"
          />

          <Label htmlFor="contactPhone">
            <BodyText bold small>
              Contact phone
            </BodyText>
          </Label>
          {Boolean(touched?.phone) && (
            <BodyText color="$red10">{errors?.phone?.errors?.[0]}</BodyText>
          )}
          <Input
            value={data?.phone || ''}
            onChangeText={(text) => setValue('phone', text)}
            id="contactPhone"
            placeholder="Contact Phone"
            autoComplete="tel"
          />
        </Stack>

        <XStack marginTop={37}>
          <DarkButton
            light
            paddingHorizontal={20}
            borderRadius={'$4'}
            onPress={save}
            icon={isSavingContact ? <SpinnerThemed /> : null}
          >
            Save
          </DarkButton>
        </XStack>
      </ElevatedCard>
    </Form>
  );
});
