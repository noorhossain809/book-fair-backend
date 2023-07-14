import { Model } from 'mongoose';

export type userName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: userName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser>;
