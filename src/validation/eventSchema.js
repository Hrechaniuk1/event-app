import Joi from 'joi';

export const eventSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'any.required': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 20 characters long',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Should be a valid email address',
        'any.required': 'Email is required',
    }),
    dateOfBirth: Joi.date()
        .optional()
        .messages({
            'date.base': 'Date of Birth should be a valid date',
        }),
        howUKnow: Joi.string()
        .valid('Social media', 'Friends', 'Found myself')
        .default('Found myself')
        .messages({
            'any.only': 'How do you know should be one of the following: Social media, Friends, Found myself',
        }),
});
