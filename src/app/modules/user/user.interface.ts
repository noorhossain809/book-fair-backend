import { Model } from 'mongoose';

export type IUser = {
  id: string;
  email: string;
  password: string;
};

export type UserModel = {
  isExistUser(email: string): Promise<Pick<IUser, 'email' | 'password' | 'id'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
