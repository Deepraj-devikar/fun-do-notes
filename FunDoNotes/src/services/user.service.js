import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config/auth';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  // password hashing before saving to database
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  body.password = hashedPassword;
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};

//get single user in login data by login details and also checking login is correct or not
export const getLoginData = async (body) => {
  const user = await User.findOne({email: body.email});
  if(!user){
    return {error: 1, status: 404, message: "User Not found."};
  }
  const isMatchedPassword = await bcrypt.compare(body.password, user.password);
  if (!isMatchedPassword) {
    return {error: 1, status: 401, message: "Invalid Password!"};
  }
  return {error: 0, status: 200, ok: 'ok', message: "Login successfull", user: user};
};