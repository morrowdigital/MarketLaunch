import { Container } from 'inversify';
import { AuthenticationGuardPresenter } from '~/components/authentication-guard/authentication-guard-presenter';
import { RootPagePresenter } from '~/pages/index.presenter';
import { LoginPagePresenter } from '~/pages/login.presenter';
import { AccountStore } from '~/state/account-store';
import { NewBuyerPagePresenter } from '~/pages/new-buyer.presenter';
import { NewVendorPagePresenter } from '~/pages/new-vendor.presenter';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { ForbiddenPresenter } from '~/components/forbidden/forbidden.presenter';
import { SidebarPresenter } from '~/components/sidebar/sidebar.presenter';
import { OrdersStore } from '~/state/orders-store';
import { TabbarPresenter } from '~/components/tabbar/tabbar.presenter';
import { OrderStore } from '~/state/order-store';
import { BuyerActionMenuPresenter } from '~/pages/buyer-orders/[id]/components/action-menu.presenter';
import { OrdersPresenter } from '~/pages/orders/orders.presenter';
import { ProductsPresenter } from '~/pages/products/products.presenter';
import { ProductsStore } from '~/state/products-store';
import { ProductDetailPresenter } from '~/pages/products/[id]/product-detail.presenter';
import { ProductStore } from '~/state/product-store';
import { NewProductPresenter } from '~/pages/new-product/new-product.presenter';
import { RichTextEditorPresenter } from '~/components/rich-text-editor/rich-text-editor.presenter';
import { StockFormPresenter } from '~/components/stock-modal/stock-form.presenter';
import { VariantFormPresenter } from '~/components/variant-modal/variant-form.presenter';
import { StripeLinkGuardPresenter } from '~/pages/payouts/components/stripe-link-guard.presenter';
import { StripeAccountStore } from '~/state/stripe-account.store';
import { ProductFormPresenter } from '~/components/product-form/product-form.presenter';
import { FulfilOrderModalPresenter } from '~/components/fulfil-order-modal/fulfil-order-modal.presenter';
import { SettingsStore } from '~/state/settings-store';
import { FulfilOrderFormPresenter } from '~/components/fulfil-order-modal/fulfil-order-form.presenter';
import { ContactFormPresenter } from '~/pages/settings/components/contact-form/contact-form.presenter';
import { FormPresenter } from '../form.presenter';
import { ForgotPasswordFormPresenter } from '~/pages/forgot-password/components/forgot-password-form/forgot-password-form.presenter';
import { ChangePasswordFormPresenter } from '~/pages/forgot-password/components/change-password-form/change-password-form.presenter';
import { VendorFormPresenter } from '~/pages/settings/components/vendor-form/vendor-form.presenter';
import { ProductStockTableLinePresenter } from '~/components/product-form/product-stock/product-stock-table-line/product-stock-table-line-presenter';
import { ToastThemedStore } from '~/components/toast-themed/toast-themed-store';
import { AccountFormPresenter } from '~/pages/settings/components/account-form/account-form.presenter';
import { SettingsPresenter } from '~/pages/settings/settings.presenter';
import { ProductPriceFieldPresenter } from '~/pages/products/components/products-table/product-price-field.presenter';
import { ProductVariantsPresenter } from '~/components/product-form/product-variants/product-variants.presenter';
import { MultiSelectMenuPresenter } from '~/components/multi-select-menu/multi-select-menu.presenter';
import { PayoutsPresenter } from '~/pages/payouts/payouts.presenter';
import { OrderDetailPresenter } from '~/pages/orders/[id]/order-detail.presenter';
import { VendorActionMenuPresenter } from '~/pages/vendor-orders/[id]/components/action-menu.presenter';

const rootContainer = new Container();

/** Singletons **/

rootContainer
  .bind<ToastThemedStore>(Symbol.for(Injectables.ToastThemedStore))
  .to(ToastThemedStore)
  .inSingletonScope();

rootContainer
  .bind<AccountStore>(Symbol.for(Injectables.AccountStore))
  .to(AccountStore)
  .inSingletonScope();

rootContainer
  .bind<OrdersStore>(Symbol.for(Injectables.OrdersStore))
  .to(OrdersStore)
  .inSingletonScope();

rootContainer
  .bind<OrderStore>(Symbol.for(Injectables.OrderStore))
  .to(OrderStore)
  .inSingletonScope();

rootContainer
  .bind<ProductsStore>(Symbol.for(Injectables.ProductsStore))
  .to(ProductsStore)
  .inSingletonScope();

rootContainer
  .bind<ProductStore>(Symbol.for(Injectables.ProductStore))
  .to(ProductStore)
  .inSingletonScope();

rootContainer
  .bind<StripeAccountStore>(Symbol.for(Injectables.StripeAccountStore))
  .to(StripeAccountStore)
  .inSingletonScope();

rootContainer
  .bind<SettingsStore>(Symbol.for(Injectables.SettingsStore))
  .to(SettingsStore)
  .inSingletonScope();

/** Transients **/
rootContainer
  .bind<AuthenticationGuardPresenter>(Symbol.for(Injectables.AuthenticationGuardPresenter))
  .to(AuthenticationGuardPresenter)
  .inTransientScope();
rootContainer
  .bind<RootPagePresenter>(Symbol.for(Injectables.HomePagePresenter))
  .to(RootPagePresenter)
  .inTransientScope();
rootContainer
  .bind<LoginPagePresenter>(Symbol.for(Injectables.LoginPagePresenter))
  .to(LoginPagePresenter)
  .inTransientScope();
rootContainer
  .bind<NewBuyerPagePresenter>(Symbol.for(Injectables.NewBuyerPagePresenter))
  .to(NewBuyerPagePresenter)
  .inTransientScope();
rootContainer
  .bind<NewVendorPagePresenter>(Symbol.for(Injectables.NewVendorPagePresenter))
  .to(NewVendorPagePresenter)
  .inTransientScope();
rootContainer
  .bind<ForbiddenPresenter>(Symbol.for(Injectables.ForbiddenPresenter))
  .to(ForbiddenPresenter)
  .inTransientScope();
rootContainer
  .bind<SidebarPresenter>(Symbol.for(Injectables.SidebarPresenter))
  .to(SidebarPresenter)
  .inTransientScope();
rootContainer
  .bind<OrderDetailPresenter>(Symbol.for(Injectables.OrderDetailPresenter))
  .to(OrderDetailPresenter)
  .inTransientScope();
rootContainer
  .bind<TabbarPresenter>(Symbol.for(Injectables.TabbarPresenter))
  .to(TabbarPresenter)
  .inTransientScope();
rootContainer
  .bind<VendorActionMenuPresenter>(Symbol.for(Injectables.VendorActionMenuPresenter))
  .to(VendorActionMenuPresenter)
  .inTransientScope();
rootContainer
  .bind<BuyerActionMenuPresenter>(Symbol.for(Injectables.BuyerActionMenuPresenter))
  .to(BuyerActionMenuPresenter)
  .inTransientScope();
rootContainer
  .bind<OrdersPresenter>(Symbol.for(Injectables.OrdersPresenter))
  .to(OrdersPresenter)
  .inTransientScope();
rootContainer
  .bind<ProductsPresenter>(Symbol.for(Injectables.ProductsPresenter))
  .to(ProductsPresenter)
  .inTransientScope();
rootContainer
  .bind<ProductDetailPresenter>(Symbol.for(Injectables.ProductDetailPresenter))
  .to(ProductDetailPresenter)
  .inTransientScope();
rootContainer
  .bind<NewProductPresenter>(Symbol.for(Injectables.NewProductPresenter))
  .to(NewProductPresenter);
rootContainer
  .bind<RichTextEditorPresenter>(Symbol.for(Injectables.RichTextEditorPresenter))
  .to(RichTextEditorPresenter)
  .inTransientScope();
rootContainer
  .bind<StockFormPresenter>(Symbol.for(Injectables.StockFormPresenter))
  .to(StockFormPresenter);
rootContainer
  .bind<VariantFormPresenter>(Symbol.for(Injectables.VariantFormPresenter))
  .to(VariantFormPresenter)
  .inTransientScope();
rootContainer
  .bind<StripeLinkGuardPresenter>(Symbol.for(Injectables.StripeLinkGuardPresenter))
  .to(StripeLinkGuardPresenter)
  .inTransientScope();
rootContainer
  .bind<ProductFormPresenter>(Symbol.for(Injectables.ProductFormPresenter))
  .to(ProductFormPresenter);
rootContainer
  .bind<ProductStockTableLinePresenter>(Symbol.for(Injectables.ProductStockTableLinePresenter))
  .to(ProductStockTableLinePresenter);
rootContainer
  .bind<FulfilOrderModalPresenter>(Symbol.for(Injectables.FulfilOrderModalPresenter))
  .to(FulfilOrderModalPresenter)
  .inTransientScope();
rootContainer
  .bind<FulfilOrderFormPresenter>(Symbol.for(Injectables.FulfilOrderFormPresenter))
  .to(FulfilOrderFormPresenter)
  .inTransientScope();

rootContainer
  .bind<ContactFormPresenter>(Symbol.for(Injectables.ContactFormPresenter))
  .to(ContactFormPresenter)
  .inTransientScope();

rootContainer
  .bind<VendorFormPresenter>(Symbol.for(Injectables.VendorFormPresenter))
  .to(VendorFormPresenter)
  .inTransientScope();

rootContainer
  .bind<FormPresenter<any>>(Symbol.for(Injectables.FormPresenter))
  .to(FormPresenter)
  .inTransientScope();

rootContainer
  .bind<ForgotPasswordFormPresenter>(Symbol.for(Injectables.ForgotPasswordFormPresenter))
  .to(ForgotPasswordFormPresenter)
  .inTransientScope();

rootContainer
  .bind<ChangePasswordFormPresenter>(Symbol.for(Injectables.ChangePasswordFormPresenter))
  .to(ChangePasswordFormPresenter);

rootContainer
  .bind<AccountFormPresenter>(Symbol.for(Injectables.AccountFormPresenter))
  .to(AccountFormPresenter)
  .inTransientScope();

rootContainer
  .bind<SettingsPresenter>(Symbol.for(Injectables.SettingsPresenter))
  .to(SettingsPresenter)
  .inTransientScope();

rootContainer
  .bind<ProductPriceFieldPresenter>(Symbol.for(Injectables.ProductPriceFieldPresenter))
  .to(ProductPriceFieldPresenter)
  .inTransientScope();

rootContainer
  .bind<MultiSelectMenuPresenter>(Symbol.for(Injectables.MultiSelectMenuPresenter))
  .to(MultiSelectMenuPresenter)
  .inTransientScope();

rootContainer
  .bind<ProductVariantsPresenter>(Symbol.for(Injectables.ProductVariantsPresenter))
  .to(ProductVariantsPresenter)
  .inTransientScope();

rootContainer
  .bind<PayoutsPresenter>(Symbol.for(Injectables.PayoutsPresenter))
  .to(PayoutsPresenter)
  .inTransientScope();

export const getRootContainer = () => rootContainer;
