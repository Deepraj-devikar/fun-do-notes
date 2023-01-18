import Joi from '@hapi/joi';

export const registerUserValidator = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().min(4).required(),
		lastName: Joi.string().min(4).required(),
		email: Joi.string().email({ tlds: { allow: false } }).required(),
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

export const loginUserValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email({ tlds: { allow: false } }).required(),
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

export const forgetPasswordValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email({ tlds: { allow: false } }).required()
	});
	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
	} else {
		req.validatedBody = value;
		next();
	}
};

export const resetPasswordValidator = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().min(6).required()
	});
	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
	} else {
		req.validatedBody = value;
		next();
	}
};