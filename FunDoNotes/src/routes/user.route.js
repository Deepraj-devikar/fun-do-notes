import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerUserValidator, loginUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', registerUserValidator, userController.registerUser);

//route to login user
router.post('/login', loginUserValidator, userController.loginUser);

export default router;
