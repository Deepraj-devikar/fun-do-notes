import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authSecretKey } from '../config/auth';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
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
    // get user email we got in request
    const user = await UserService.getUserByEmail(req.body.email);
    
    // if we not found user with email
    if(!user){
      return res.status(404).send({ message: "User Not found." });
    }
    
    // match password
    bcrypt.compare(req.body.password, user.password).then(function(result) {
      if(!result){
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
      // login successful
      const userDetails = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      jwt.sign(userDetails, authSecretKey, {expiresIn: '99999999999999'}, (error, token) => {
        if(!error){
          userDetails.token = token;
          res.status(200).send({
            ok: 'ok',
            status: 200,
            message: "Login successfull",
            data: userDetails
          });
        } else {
          res.status(500).send({ message: error.message })
        }
      });
    });
  } catch(error){
    return res.status(500).send({ message: error.message });
  }
}

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
