export const passwordRules = [
  (val) => !!val || 'Password is required',
  (val) => val.length >= 8 || 'Password must be at least 8 characters long',
  (val) =>
    /[A-Z]/.test(val) ||
    'Password must contain at least one uppercase letter',
  (val) =>
    /[a-z]/.test(val) ||
    'Password must contain at least one lowercase letter',
  (val) => /[0-9]/.test(val) || 'Password must contain at least one number',
  (val) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(val) ||
    'Password must contain at least one special character',
];


export const usernameRules = [
  (val) => !!val || 'Username is required',
  (val) => val.length >= 3 || 'Username must be at least 3 characters',
];

export const emailRule = [(val) => !!val || 'Email is required',
(val) =>
  /.+@.+\..+/.test(val) || 'Please enter a valid email address'];

