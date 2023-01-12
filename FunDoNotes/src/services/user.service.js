import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//register user
export const registerUser = async (body) => {
	// password hashing before saving to database
	console.log("INPUT - user.service -> registerUser ----->", body);
	const salt = await bcrypt.genSalt(process.env.SALT_ROUND);
	const hashedPassword = await bcrypt.hash(body.password, salt);
	body.password = hashedPassword;
	const data = await User.create(body);
	console.log("OUTPUT - user.service -> registerUser ----->", data);
	return data;
};

//login user
export const loginUser = async (body) => {
	console.log("INPUT - user.service -> loginUser ----->", body);
	const user = await User.findOne({email: body.email});
	if(!user){
		return {error: 1, status: 404, message: "User Not found."};
	}
	const isMatchedPassword = await bcrypt.compare(body.password, user.password);
	if (!isMatchedPassword) {
		return {error: 1, status: 401, message: "Invalid Password!"};
	}
	const token = jwt.sign({id: user.id, email: user.email}, process.env.AUTH_SECRET_KEY);
	return {error: 0, status: 200, ok: 'ok', user: user, token: token, message: "Login successfull"};
};