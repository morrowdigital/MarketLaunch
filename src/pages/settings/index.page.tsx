import { observer } from 'mobx-react-lite';
import { AuthenticationGuard } from '~/components/authentication-guard/authentication-guard';
import { XStack, YStack } from 'tamagui';
import { PageWrapper } from '~/components/wrapper';
import { PageHeader } from '~/components/page-header';
import { SettingsIcon } from '~/components/icons/icons';
import { ContactForm } from './components/contact-form/contact-form';
import { VendorForm } from './components/vendor-form/vendor-form';
import { AccountForm } from './components/account-form/account-form';
import { useSettingsPresenter } from './settings.presenter';

export default observer(function SettingsPage() {
  const { isVendor } = useSettingsPresenter();

  return (
    <AuthenticationGuard allowedGroups={['buyers', 'vendors']}>
      <PageWrapper>
        <YStack flex={1} space="$6">
          <PageHeader title="Settings" left={<SettingsIcon dark />} />
          <XStack space="$4">
            <ContactForm />
            {isVendor && <VendorForm />}
            <AccountForm />
          </XStack>
        </YStack>
      </PageWrapper>
    </AuthenticationGuard>
  );
});
