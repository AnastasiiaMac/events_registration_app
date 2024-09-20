import Joi from 'joi';

export const registrationValidationSchema = Joi.object({
  fullName: Joi.string().max(50).required().messages({
    'string.base': 'Full name must be a string',
    'string.empty': 'Full name is required',
    'string.max': 'Full name cannot be more than 50 characters',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
    }),

  dateOfBirth: Joi.date().less('now').required().messages({
    'date.less': 'Date of birth cannot be in the future',
    'any.required': 'Date of birth is required',
  }),

  referral: Joi.string().max(100).allow('', null).messages({
    'string.max': 'Referral information cannot exceed 100 characters',
  }),

  eventId: Joi.string().required().messages({
    'any.required': 'Event ID is required',
  }),
});
