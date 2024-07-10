import { injectable } from 'inversify';
import { action, IReactionDisposer, makeAutoObservable, reaction, runInAction } from 'mobx';
import { Injectables } from '~/utils/inversifyJS/injectables';
import { useDependencyWithInit } from '~/utils/inversifyJS/use-dependency';
import { validateForm } from '~/utils/validate-form';

type FormErrors<T> = Partial<Record<keyof T, { errors: string[] }>>;
type FormTouched<T> = Partial<Record<keyof T, boolean>>;

@injectable()
export class FormPresenter<T> {
  private _reactionDisposer: IReactionDisposer | null = null;
  private _validator = (_formData: Partial<T>) => {};

  constructor() {
    makeAutoObservable(this, {
      init: action,
      setTouched: action,
      setValue: action,
      setFormErrors: action,
      setIsValid: action,
    });

    runInAction(() => {
      this._reactionDisposer = reaction(
        () => this.data,
        (_formData) => {
          this.validate();
        }
      );
    });
  }

  init = ({
    validator,
    initialData,
  }: {
    validator: (formData: Partial<T>) => void;
    initialData: T;
  }) => {
    this._validator = validator;

    if (!this._formData) {
      this._formData = initialData;
      this.validate();
    }
  };

  validate = () => {
    const result = validateForm(this.data!, this._validator);
    this.setIsValid(result.errorCount === 0);
    this.setFormErrors(result.tests as FormErrors<T>);
  };

  private _formData?: Partial<T>;

  get data() {
    return this._formData;
  }

  private _formTouched?: FormTouched<T>;

  get touched() {
    return this._formTouched;
  }

  setTouched = <K extends keyof T>(key: K, value: boolean) => {
    this._formTouched = { ...this._formTouched, [key]: value };
  };

  private _isValid: boolean = false;

  setValue = <K extends keyof T, V extends T[K]>(key: K, value: V) => {
    this._formData = { ...this._formData, [key]: value };
  };

  setIsValid = (value: boolean) => {
    this._isValid = value;
  };

  get isValid() {
    return this._isValid;
  }

  private _formErrors?: FormErrors<T>;

  get errors() {
    return this._formErrors;
  }

  setFormErrors = (errors: FormErrors<T>) => {
    this._formErrors = errors;
  };

  cleanup = () => {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = null;
    }
  };
}

export const useFormPresenter = <T>({
  validator,
  initialData,
}: {
  validator: (formData: Partial<T>) => void;
  initialData: T;
}) =>
  useDependencyWithInit<
    { validator: (formData: Partial<T>) => void; initialData: T },
    FormPresenter<T>
  >(Symbol.for(Injectables.FormPresenter), { validator, initialData });
