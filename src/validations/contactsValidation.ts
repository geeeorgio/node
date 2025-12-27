import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

import type { ContactType } from '../types/contact.js';
import { contactCategoryTypes } from '../types/contact.js';

export const createContactSchema = Joi.object<ContactType>({
  name: Joi.string().min(1).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should contain at least 1 character',
    'string.max': 'Name should contain up to 20 characters',
    'any.required': 'Name is required',
  }),
  age: Joi.number().min(1).max(100).required().messages({
    'number.base': 'Age should be a number',
    'number.min': 'Age must be at least 1',
    'number.max': 'Age must be 100 or less',
    'any.required': 'Age is required',
  }),
  country: Joi.string().min(1).max(30).required().messages({
    'string.base': 'Country should be a string',
    'string.min': 'Country should contain at least 1 character',
    'string.max': 'Country should contain up to 30 characters',
    'any.required': 'Country is required',
  }),
  category: Joi.string()
    .valid(...contactCategoryTypes)
    .required()
    .messages({
      'any.only': `Category must be one of: ${contactCategoryTypes.join(', ')}`,
      'any.required': 'Category is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(1).max(20),
  age: Joi.number().min(1).max(100),
  country: Joi.string().min(1).max(30),
  category: Joi.string().valid(...contactCategoryTypes),
}).min(1);

export const mongoIdValidator = (value: string, helpers: Joi.CustomHelpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message({ custom: 'Invalid MongoDB ID format' });
  }
  return value;
};

export const contactIdSchema = Joi.object({
  contactId: Joi.string().custom(mongoIdValidator).required(),
});
