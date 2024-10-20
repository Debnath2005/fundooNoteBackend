/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  loginUserValidator,
  newUserValidator
} from '../validators/user.validator';

import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', newUserValidator, userController.newUser);

router.post('/login', loginUserValidator, userController.loginUser);

router.post('/forgetPassword',userController.forgetPassword)

router.post('/resetPassword',userController.resetPassword)

export default router;
