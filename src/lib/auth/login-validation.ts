export type LoginFieldErrors = {
  email?: string;
  password?: string;
  form?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeLoginEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateLoginInput(email: string, password: string): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const normalizedEmail = normalizeLoginEmail(email);

  if (!normalizedEmail) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function hasLoginFieldErrors(errors: LoginFieldErrors) {
  return Boolean(errors.email || errors.password || errors.form);
}
