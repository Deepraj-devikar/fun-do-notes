import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

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
		next(error);
	}
}