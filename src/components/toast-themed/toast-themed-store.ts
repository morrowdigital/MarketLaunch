import { injectable } from 'inversify';
import { ToastController } from '~/components/toast-themed/toast-themed';

/** Makes the use of ToastThemed imperatively available via a Store */
@injectable()
export class ToastThemedStore {
  private controller?: ToastController = undefined;

  init = (controller: ToastController) => {
    this.controller = controller;
  };

  show = (title: string, message: string, error = false) => {
    this.controller?.show(title, { message, additionalInfo: { error } });
  };
}
