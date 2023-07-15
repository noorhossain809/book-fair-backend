import express from 'express';
import validateRequest from '../../../middleweres/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.post(
  '/login',
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
);

export const UserRoutes = router;
