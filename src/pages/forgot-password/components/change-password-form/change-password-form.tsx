import { observer } from 'mobx-react-lite';
import { Form, XStack, Stack, Input, Label } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { DarkButton } from '~/components/dark-button';
import { ElevatedCard } from '~/components/elevated-card';

import { SpinnerThemed } from '~/components/spinner-themed';
import { useEffect } from 'react';
import { useChangePasswordFormPresenter } from './change-password-form.presenter';

import { useRouter } from 'next/router';

export const ChangePasswordForm = observer(() => {
  const {
    data,
    setValue,
    setTouched,
    touched,
    errors,
    isValid,
    cleanup,
    savePassword,
    setResetKey,
    isLoading,
  } = useChangePasswordFormPresenter();

  const resetKey = useRouter().query.key as string;

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  useEffect(() => {
    if (resetKey) {
      setResetKey(resetKey);
    }
  }, [setResetKey, resetKey]);

  return (
    <Form onSubmit={() => {}}>
      <ElevatedCard padding={15} minWidth={286} elevation={12}>
        <Stack marginTop={20}>
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
            onChangeText={(text) => setValue('password', text)}
            onBlur={() => setTouched('password', true)}
            id="password"
            placeholder="Password"
            autoComplete="password"
          />
        </Stack>

        <Stack marginTop={20}>
          <Label htmlFor="password">
            <BodyText bold small>
              Confirm Password
            </BodyText>
          </Label>
          {touched?.confirmPassword ? (
            <BodyText color="$red10">{errors?.confirmPassword?.errors?.[0]}</BodyText>
          ) : null}
          <Input
            value={data?.confirmPassword || ''}
            onChangeText={(text) => setValue('confirmPassword', text)}
            onBlur={() => setTouched('confirmPassword', true)}
            id="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="password"
          />
        </Stack>

        <XStack marginTop={37}>
          <DarkButton
            onPress={savePassword}
            disabled={!isValid}
            borderRadius={'$4'}
            icon={isLoading ? <SpinnerThemed /> : null}
          >
            Change Password
          </DarkButton>
        </XStack>
      </ElevatedCard>
    </Form>
  );
});
