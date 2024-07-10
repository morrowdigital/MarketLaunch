import { enforce } from 'vest';

const phoneRegex = /^[0-9+]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailIsValid = (formData: { email?: string }) => () => validateEmail(formData.email);
export const phoneNumberIsValid = (formData: { phone?: string }) => () =>
  validatePhoneNumber(formData.phone);

function validateEmail(text?: string) {
  enforce(text).matches(emailRegex);
}

function validatePhoneNumber(text?: string) {
  const cleanedPhone = text?.replace(/\s/g, '');
  enforce(cleanedPhone).matches(phoneRegex);
}
