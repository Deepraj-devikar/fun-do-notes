import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mail.util';
import { amqpPublisher } from '../utils/amqpPub.util';
import HttpStatus from 'http-status-codes';

//password hashing
const getHashPassword = async (password) => {
	const salt = await bcrypt.genSalt(process.env.SALT_ROUND);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

//register user
export const registerUser = async (body) => {
	// password hashing before saving to database
	body.password = await getHashPassword(body.password);
	const data = await User.create(body);
	return data;
};

//login user
export const loginUser = async (body) => {
	const user = await User.findOne({email: body.email});
	if(!user){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "User Not found."};
	}
	const isMatchedPassword = await bcrypt.compare(body.password, user.password);
	if (!isMatchedPassword) {
		return {error: 1, status: HttpStatus.UNAUTHORIZED, message: "Invalid Password!"};
	}
	const token = jwt.sign({id: user.id, email: user.email}, process.env.AUTH_SECRET_KEY);
	return {error: 0, status: HttpStatus.OK, ok: 'ok', user: user, token: token, message: "Login successfull"};
};

//forget password
export const forgetPassword = async (email) => {
	console.log("INPUT - user.service -> forgetPassword ----->", email);
	const user = await User.findOne({email: email});
	if(!user){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "User Not found."};
	}
	const token = jwt.sign({id: user.id, email: user.email}, process.env.AUTH_SECRET_KEY+user.password, {expiresIn: '15m'});
	const resetPasswordUrl = process.env.BASE_URL + `/users/reset-password/${user.email}/${token}`;
	sendMail({
		to: user.email,
		subject: "Please reset your password for FunDoNotes.",
		text: "your password reset link :- " + resetPasswordUrl,
		html: "<h1>your password reset link</h1><br><p>"+resetPasswordUrl+"</p>"
	});
	return {error: 0, status: HttpStatus.OK, ok: 'ok', message: "Password reset link is send to your email."};	
}

//reset password
export const resetPassword = async (params, body) => {
	console.log("INPUT - user.service -> resetPassword ----->", params._email);
	const user = await User.findOne({email: params._email});
	if(!user){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "User Not found."};
	}
	const forgetPasswordUser = await jwt.verify(params._token, process.env.AUTH_SECRET_KEY+user.password);
	if (forgetPasswordUser.id != user.id || forgetPasswordUser.email != user.email) {
		return {error: 1, status: HttpStatus.UNAUTHORIZED, message: "Password reset token invalid or expired."};
	}
	if (body.password != body.confirmPassword) {
		return {error: 1, status: HttpStatus.FORBIDDEN, message: "Password and confirm password is not match."};
	}
	const hashedPassword = await getHashPassword(body.password);
	const data = await User.findByIdAndUpdate(
        {
            _id: user.id,
            email: user.email
        },
        {
			password: hashedPassword
		},
        {
            new: true
        }
    );
	amqpPublisher({
		to: user.email,
		subject: "Your password reset successfully for FunDoNotes.",
		text: "Your password reset successfully for FunDoNotes.",
		html: "<h1>Your password reset successfully for FunDoNotes.</h1>"
	});
	return {error: 0, status: HttpStatus.OK, ok: 'ok', user: data, message: "Password reset successfully."};	
}