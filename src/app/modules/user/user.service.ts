import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

const loginUser = async (payload: IUser) => {
  const { email, password } = payload;

  // check existing user
  const isExistUser = await User.isExistUser(email);

  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // password match
  if (
    isExistUser.password &&
    !(await User.isPasswordMatch(password, isExistUser.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password does not match');
  }

  // create access token
  const { email: userEmail, id } = isExistUser;
  const accessToken = jwtHelpers.createToken(
    { userEmail, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

export const UserService = {
  createUser,
  loginUser,
  getSingleUser,
};
