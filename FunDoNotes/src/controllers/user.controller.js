import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import jwt from 'jsonwebtoken';
import { authSecretKey } from '../config/auth';

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

    if (data.error == 1) {
      return res.status(data.status).send(data);
    } else {
      // login successful
      const user = data.user;
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
    }
  } catch(error){
    return res.status(500).send({ message: error.message });
  }
}
