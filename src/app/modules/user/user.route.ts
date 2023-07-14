import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../../middleweres/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router
  .get('/', UserController.getAllUsers)
  .get('/:id', UserController.getSingleUser)
  .patch(
    '/:id',
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser
  )
  .delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
