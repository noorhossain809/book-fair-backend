import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendRequest';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await UserService.loginUser(loginData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Logged in successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
};
