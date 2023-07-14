import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const userCreate = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

export const AuthService = {
  userCreate,
};
