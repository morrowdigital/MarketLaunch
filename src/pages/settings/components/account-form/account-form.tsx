import { YStack, XStack, Form, Label, Input, H2 } from 'tamagui';
import { observer } from 'mobx-react-lite';
import { BodyText } from '~/components/body-text';
import { ElevatedCard } from '~/components/elevated-card';
import { DarkButton } from '~/components/dark-button';
import { useAccountFormPresenter } from './account-form.presenter';
import { SpinnerThemed } from '~/components/spinner-themed';
import { useEffect } from 'react';

export const AccountForm = observer(() => {
  const {
    data,
    setValue,
    setTouched,
    save,
    isSavingAccount,
    touched,
    errors,
    isValid,
    accountAlreadyExists,
    cleanup,
  } = useAccountFormPresenter();

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <Form onSubmit={() => {}}>
      <H2>Account Details</H2>
      <ElevatedCard padding={15} minWidth={286} marginTop="$4" elevation={12}>
        <YStack>
          <Label htmlFor="email">
            <BodyText bold small>
              Email
            </BodyText>
          </Label>
          {touched?.email ? <BodyText color="$red10">{errors?.email?.errors?.[0]}</BodyText> : null}
          {accountAlreadyExists ? <BodyText color="$red10">Account already exists</BodyText> : null}
          <Input
            value={data?.email || ''}
            id="email"
            onChangeText={(text) => setValue('email', text)}
            onBlur={() => setTouched('email', true)}
            placeholder="Email"
            autoComplete="email"
          />

          <Label htmlFor="password">
            <BodyText bold small>
              Password
            </BodyText>
          </Label>

          {touched?.password ? (
            <BodyText color="$red10">{errors?.password?.errors?.[0]}</BodyText>
          ) : null}

          <Input
            value={data?.password || ''}
            id="email"
            secureTextEntry
            onChangeText={(text) => setValue('password', text)}
            onBlur={() => setTouched('password', true)}
            placeholder="Password"
            autoComplete="password"
          />

          <Label htmlFor="confirmPassword">
            <BodyText bold small>
              Confirm password
            </BodyText>
          </Label>
          {touched?.confirmPassword ? (
            <BodyText color="$red10">{errors?.confirmPassword?.errors?.[0]}</BodyText>
          ) : null}
          <Input
            value={data?.confirmPassword || ''}
            id="confirmPassword"
            secureTextEntry
            onChangeText={(text) => setValue('confirmPassword', text)}
            onBlur={() => setTouched('confirmPassword', true)}
            placeholder="Confirm password"
            autoComplete="password"
          />
        </YStack>

        <XStack marginTop={37}>
          <DarkButton
            light
            paddingHorizontal={20}
            disabled={!isValid}
            borderRadius={'$4'}
            onPress={save}
            icon={isSavingAccount ? <SpinnerThemed /> : null}
          >
            Save
          </DarkButton>
        </XStack>
      </ElevatedCard>
    </Form>
  );
});
