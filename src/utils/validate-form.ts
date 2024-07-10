import { create } from 'vest';

export const validateForm = <T>(formData: Partial<T>, validator: (data: Partial<T>) => void) =>
  create('form-validation', validator)(formData);
