import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config/auth';

const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  try{
    // password hashing before saving to database
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export default model('User', userSchema);