import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendRequest';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await AuthService.userCreate(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result?.role === 'buyer' ? 'Buyer created successfully' : 'Seller created successfully',
    data: result,
  });
});

export const AuthController = {
  createUser,
};
