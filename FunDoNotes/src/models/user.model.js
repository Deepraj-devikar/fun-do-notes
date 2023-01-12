import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema(
	{
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		email: {
			type: String,
			index: true,
			required: true,
			unique : true 
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);
