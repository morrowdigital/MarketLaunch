import { observer } from 'mobx-react-lite';
import { Checkbox, Form, Input, Label, Separator, Stack, XStack, YStack, H2 } from 'tamagui';
import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { FormError, InlineLink } from '~/components/inline-link';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { NewBuyerPagePresenter } from '~/pages/new-buyer.presenter';
import { AppLogo } from '~/components/app-logo';
import { RegistrationTextInput } from '~/components/registration-text.input';
import { useAccountSubmit } from '~/utils/use-account.submit';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { DarkButton } from '~/components/dark-button';
import { SpinnerThemed } from '~/components/spinner-themed';
import { CenteredContent } from '~/components/centered-content';
import { ElevatedCard } from '~/components/elevated-card';
import { BodyText } from '~/components/body-text';
import { Routes } from '~/types/model';
import { TermsModal } from '~/components/terms-modal/terms-modal';
import { appConfig } from '~/app-config/app-config';

export default observer(function NewBuyerPage() {
  const { onFormSubmit, isSubmitting, formData, updateField, formErrors } =
    useNewBuyerPagePresenter();

  const onSubmit = useAccountSubmit(onFormSubmit);

  return (
    <CenteredContent>
      <AppLogo width={311} height={50} />
      <H2 marginVertical={26}>Buyer Registration</H2>

      <Form onSubmit={onSubmit}>
        <ElevatedCard padding={15} marginTop={37} maxWidth={360} width="100%" elevation={12}>
          <RegistrationTextInput
            id="email"
            label="Email address"
            placeholder="email@example.com"
            value={formData.email}
            onChangeText={updateField('email')}
            error={formErrors?.email?.[0]}
            inputMode="email"
            autoComplete="email"
          />

          <Stack marginTop={20}>
            <RegistrationTextInput
              id="password"
              label="Password"
              placeholder="password"
              secureTextEntry
              value={formData.password}
              onChangeText={updateField('password')}
              error={formErrors?.password?.[0]}
            />
          </Stack>

          <Stack marginTop={20}>
            <RegistrationTextInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="config password"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={updateField('confirmPassword')}
              error={formErrors?.confirmPassword?.[0]}
            />
          </Stack>

          <Separator marginVertical={20} borderColor="$colorAFaint" />
          <YStack>
            <Label htmlFor="firstName">
              <BodyText bold small>
                Name
              </BodyText>
            </Label>

            <XStack space>
              <Input
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChangeText={updateField('firstName')}
                autoComplete="name"
              />
              <Input
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChangeText={updateField('lastName')}
                autoComplete="name"
              />
            </XStack>
            {(formErrors?.firstName?.[0] || formErrors?.lastName?.[0]) && (
              <FormError>{formErrors?.firstName?.[0] ?? formErrors?.lastName?.[0]}</FormError>
            )}
          </YStack>

          <RegistrationTextInput
            id="phone"
            placeholder="01275 462522"
            inputMode="tel"
            value={formData.phone}
            onChangeText={updateField('phone')}
            autoComplete="tel"
            label="Contact phone"
            error={formErrors?.phone?.[0]}
          />

          <XStack marginTop={20} space alignItems="center">
            <Checkbox
              scaleSize={0.714}
              defaultChecked={formData.terms}
              onCheckedChange={updateField('terms')}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox>
            <BodyText small size="$7" color="black">
              By creating an account on this marketplace you agree to our{' '}
              <TermsModal
                title="Terms and Conditions"
                triggerText="and conditions"
                content={appConfig.termsAndConditions}
              />{' '}
              and{' '}
              <TermsModal
                title="Privacy Policy"
                triggerText="privacy policy"
                content={appConfig.privacy}
              />
            </BodyText>
          </XStack>
          {formErrors?.terms?.[0] && <FormError>{formErrors?.terms?.[0]}</FormError>}

          <XStack marginTop={20} space alignItems="center">
            <Form.Trigger asChild>
              <DarkButton>Create account</DarkButton>
            </Form.Trigger>
            {isSubmitting && <SpinnerThemed marginLeft={20} />}
          </XStack>
        </ElevatedCard>
      </Form>

      <Stack marginVertical={20}>
        <InlineLink href={Routes.Login} fontWeight="400">
          Back to Login Page
        </InlineLink>
      </Stack>
    </CenteredContent>
  );
});

const useNewBuyerPagePresenter = () =>
  useDependency<NewBuyerPagePresenter>(Symbol.for(Injectables.NewBuyerPagePresenter));
