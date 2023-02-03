import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import { logStream } from '../config/logger';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerUser = async (req, res, next) => {
	try {
		const data = await UserService.registerUser(req.body);
		res.status(HttpStatus.CREATED).json({
			code: HttpStatus.CREATED,
			data: data,
			message: 'User created successfully'
		});
	} catch (error) {
		logStream.error("Could not register user.", error);
		next(error);
	}
};

/**
 * Controller to login user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginUser = async (req, res, next) => {
	try {
		const data = await UserService.loginUser(req.body);
		return res.status(data.status).send(data);
	} catch(error){
		logStream.error("Could not login user.", error);
		next(error);
	}
}

/**
 * Controller to forget password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgetPassword = async (req, res, next) => {
	try {
		const data = await UserService.forgetPassword(req.body.email);
		return res.status(data.status).send(data);
	} catch(error){
		logStream.error("Could not forget password.", error);
		next(error);
	}
}

/**
 * Controller to reset password
 * @param  {object} req - request obejct
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
	try {
		const data = await UserService.resetPassword(req.params, req.body);
		return res.status(data.status).send(data);
	} catch(error){
		logStream.error("Could not reset password.", error);
		next(error);
	}
}