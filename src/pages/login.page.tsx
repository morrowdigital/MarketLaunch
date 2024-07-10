import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { LoginPagePresenter } from './login.presenter';
import { Form, Input, Label, Stack, XStack, YStack } from 'tamagui';
import { AppLogo } from '~/components/app-logo';
import { appConfig } from '~/app-config/app-config';
import { useToastController } from '@tamagui/toast';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { DarkButton } from '~/components/dark-button';
import { SpinnerThemed } from '~/components/spinner-themed';
import { CenteredContent } from '~/components/centered-content';
import { ElevatedCard } from '~/components/elevated-card';
import { BodyText } from '~/components/body-text';
import { LinkThemed } from '~/components/link-themed';
import { Routes } from '~/types/model';
import { useEffect } from 'react';

type LoginRedirectCardProps = {
  href: string;
  imageUri: string;
  bodyText: string;
  ctaText: string;
};
function LoginRedirectCard({ href, imageUri, bodyText, ctaText }: LoginRedirectCardProps) {
  return (
    <ElevatedCard bordered elevation={0} marginTop={20}>
      <LinkThemed href={href}>
        <YStack paddingHorizontal={12} paddingVertical={15} maxWidth={185} alignItems="center">
          <Image src={imageUri} alt="icon" width={34} height={34} />
          <BodyText textAlign="center" marginTop={10}>
            {bodyText}
          </BodyText>
          <BodyText bold marginTop={10}>
            {ctaText}
          </BodyText>
        </YStack>
      </LinkThemed>
    </ElevatedCard>
  );
}

export default observer(function LoginPage() {
  const { login, setPassword, setEmail, password, email, loginButtonDisabled } =
    useLoginPagePresenter();
  const router = useRouter();
  const { show } = useToastController();

  const routerQuery = router.query as { redirect?: string };
  const postLoginPage = routerQuery.redirect ?? '/';

  useEffect(() => {
    router.prefetch(postLoginPage);
  }, [router, postLoginPage]);

  const onLogin = async () => {
    try {
      const success = await login();
      if (success) {
        router.push(postLoginPage).then();
      }
    } catch (error) {
      show('Error', { message: (error as Error).message, additionalInfo: { error: true } });
    }
  };

  return (
    <CenteredContent>
      <AppLogo width={286} height={50} />

      <Form onSubmit={onLogin}>
        <ElevatedCard padding={15} minWidth={286} marginTop={37} elevation={12}>
          <Label htmlFor="email">
            <BodyText bold small>
              Email address
            </BodyText>
          </Label>
          <Input
            id="email"
            onChangeText={setEmail}
            value={email}
            placeholder="email@example.com"
            inputMode="email"
            autoComplete="email"
          />
          <Stack marginTop={20}>
            <Label htmlFor="password">
              <BodyText bold small>
                Password
              </BodyText>
            </Label>
            <Input
              id="password"
              onChangeText={setPassword}
              value={password}
              placeholder="password"
              secureTextEntry
              autoComplete="password"
            />
          </Stack>

          <LinkThemed href={Routes.ForgotPassword} bold marginTop={20}>
            Forgot Password
          </LinkThemed>

          <XStack marginTop={20} alignItems="center">
            <Form.Trigger asChild>
              <DarkButton disabled={loginButtonDisabled}>Login</DarkButton>
            </Form.Trigger>
            {loginButtonDisabled && <SpinnerThemed marginLeft={20} />}
          </XStack>
        </ElevatedCard>
      </Form>

      <BodyText marginTop={30}>Don&#39;t have an account?</BodyText>

      <XStack maxWidth={450} width="100%" justifyContent="space-around" flexWrap="wrap">
        <LoginRedirectCard
          href={Routes.NewVendor}
          imageUri="/money.svg"
          bodyText={`Create a vendor account and start selling through ${appConfig.theme.appName} today`}
          ctaText="Create Vendor Account"
        />
        <LoginRedirectCard
          href={Routes.NewBuyer}
          imageUri="/gift-box.svg"
          bodyText={`Create a buyer account to manage orders made through ${appConfig.theme.appName}`}
          ctaText="Create Buyer Account"
        />
      </XStack>
    </CenteredContent>
  );
});

const useLoginPagePresenter = () =>
  useDependency<LoginPagePresenter>(Symbol.for(Injectables.LoginPagePresenter));
