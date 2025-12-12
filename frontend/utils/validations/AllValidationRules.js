import { Messages } from '../Messages';
const { CommonValidationMessages } = Messages;
// Login validation rules
export const LoginValidationRules = {
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'email'),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  password: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'password'
      ),
    },
  ],
};
// Add user validation rules
export const SignUpValidationRules = {
  full_name: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'full name'
      ),
    },
  ],
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'email'),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  phone: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'mobile number'
      ),
    },
    {
      type: 'minLength',
      minLength: 10,
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid mobile number'
      ),
    },
  ],
  password: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'password'
      ),
    },
  ],
  confirmPassword: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'confirm password'
      ),
    },
    {
      type: 'compare',
      compareEle: 'password',
      message: CommonValidationMessages.ComparePassword,
    },
  ],
};
