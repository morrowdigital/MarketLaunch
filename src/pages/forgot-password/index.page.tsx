import { observer } from 'mobx-react-lite';
import { YStack, XStack } from 'tamagui';

import { PageWrapper } from '~/components/wrapper';
import { PageHeader } from '~/components/page-header';
import { ForgotPasswordForm } from './components/forgot-password-form/forgot-password-form';
import { useRouter } from 'next/router';
import { ChangePasswordForm } from './components/change-password-form/change-password-form';

export default observer(function ForgotPasswordPage() {
  const resetKey = useRouter().query.key as string;

  return (
    <PageWrapper>
      <YStack flex={1} space="$6">
        <PageHeader title="Forgot Password" />
        <XStack justifyContent="center">
          <YStack>{!resetKey ? <ForgotPasswordForm /> : <ChangePasswordForm />}</YStack>
        </XStack>
      </YStack>
    </PageWrapper>
  );
});
