import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
	try {
		let bearerToken = req.header('Authorization');
		if (!bearerToken)
			throw {
				code: HttpStatus.BAD_REQUEST,
				message: 'Authorization token is required'
			};
		bearerToken = bearerToken.split(' ')[1];

		const authUser = await jwt.verify(bearerToken, process.env.AUTH_SECRET_KEY);
		req.body.userId = authUser.id;
		next();
	} catch (error) {
		next(error);
	}
};