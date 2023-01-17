import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerUserValidator, loginUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', registerUserValidator, userController.registerUser);

//route to login user
router.post('/login', loginUserValidator, userController.loginUser);

//route for user forget password
router.post('/forget_password', userController.forgetPassword);

//route for user reset password
router.post('/reset_password/:_email/:_token', userController.resetPassword);

export default router;
