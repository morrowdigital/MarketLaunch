import { observer } from 'mobx-react-lite';
import { Form, XStack, Stack, YStack, Input, Label } from 'tamagui';
import { BodyText } from '~/components/body-text';
import { DarkButton } from '~/components/dark-button';
import { ElevatedCard } from '~/components/elevated-card';

import { useForgotPasswordFormPresenter } from './forgot-password-form.presenter';

import { useEffect } from 'react';
import { SpinnerThemed } from '~/components/spinner-themed';

export const ForgotPasswordForm = observer(() => {
  const {
    data,
    setValue,
    setTouched,
    touched,
    errors,
    isValid,
    cleanup,
    resetPassword,
    resetPasswordSuccess,
    resendCode,
    isLoading,
  } = useForgotPasswordFormPresenter();

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  if (resetPasswordSuccess) {
    return (
      <YStack padding="$2" space="$2">
        <BodyText>A reset link has been sent to your email!</BodyText>
        <DarkButton onPress={resendCode}>Resend Code</DarkButton>
      </YStack>
    );
  }

  return (
    <Form onSubmit={() => {}}>
      <ElevatedCard padding={15} minWidth={286} elevation={12}>
        <Stack>
          <Label htmlFor="email">
            <BodyText bold small>
              Email
            </BodyText>
          </Label>
          {touched?.email ? <BodyText color="$red10">{errors?.email?.errors?.[0]}</BodyText> : null}
          <Input
            value={data?.email || ''}
            onChangeText={(text) => setValue('email', text)}
            onBlur={() => setTouched('email', true)}
            id="email"
            placeholder="email"
            autoComplete="email"
          />
        </Stack>

        <XStack marginTop={37}>
          <DarkButton
            onPress={resetPassword}
            disabled={!isValid}
            borderRadius={'$4'}
            icon={isLoading ? <SpinnerThemed /> : null}
          >
            Reset Password
          </DarkButton>
        </XStack>
      </ElevatedCard>
    </Form>
  );
});
