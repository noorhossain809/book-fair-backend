import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  user: Types.ObjectId | IUser;
};
