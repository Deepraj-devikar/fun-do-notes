import express from 'express';
import * as userController from '../controllers/user.controller';
import { 
    registerUserValidator, 
    loginUserValidator, 
    forgetPasswordValidator, 
    resetPasswordValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', registerUserValidator, userController.registerUser);

//route to login user
router.post('/login', loginUserValidator, userController.loginUser);

//route for user forget password
router.post('/forget-password', forgetPasswordValidator, userController.forgetPassword);

//route for user reset password
router.post('/reset-password/:_email/:_token', resetPasswordValidator, userController.resetPassword);

export default router;
