import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

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
 * Controller to send test mail
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const sendMail = async (req, res, next) => {
	try {
		const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
		oauth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN
		});
		const accessToken = oauth2Client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'deeprajdevikar19@gmail.com',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken,
			}
		});
		const mailOptions = {
			from: 'DEEPRAJ <deeprajdevikar19@gmail.com>',
			to: 'deepd8153@gmail.com',
			subject: "Hello from gmail using API",
			text: "Hello from gmail email using API",
			html: "<h1>Hello from gmail email using API</h1>"
		};
		const result = await transport.sendMail(mailOptions);
		res.status(HttpStatus.OK).json({
			code: HttpStatus.OK,
			data: result,
			message: 'Mail send successfully'
		});
	} catch(error){
		next(error);
	}
}