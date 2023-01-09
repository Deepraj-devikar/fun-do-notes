import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
