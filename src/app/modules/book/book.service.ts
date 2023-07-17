import { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { IBook } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';

const createBook = async (payload: IBook) => {
  const result = (await Book.create(payload)).populate('user');
  return result;
};

const getAllBooks = async () => {
  const result = await Book.find({});
  return result;
};

const getASingleBook = async (id: string) => {
  const result = await Book.findOne({ _id: id });
  return result;
};
const updateBook = async (id: string, token: any, payload: IBook) => {
  const isExistBook = await Book.findOne({ _id: id });

  const user = isExistBook?.user.toString();

  // verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid access token');
  }

  const { userEmail, id: userId } = verifiedToken;

  const isExistUser = await User.isExistUser(userEmail);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (user === userId) {
    const result = await Book.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  } else {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'You cannot updated for this book'
    );
  }

  // const result = await Book.findOneAndUpdate({ _id: id }, payload, {
  //   new: true,
  // });
  // return result;
};
const deleteBook = async (id: string, token: any) => {
  const isExistBook = await Book.findOne({ _id: id });

  const user = isExistBook?.user.toString();

  // verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid access token');
  }

  const { userEmail, id: userId } = verifiedToken;

  const isExistUser = await User.isExistUser(userEmail);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (user === userId) {
    const result = await Book.findOneAndDelete({ _id: id });
    return result;
  } else {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'You cannot deleted for this book'
    );
  }

  // const result = await Book.findOneAndDelete({ _id: id });
  // return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getASingleBook,
  updateBook,
  deleteBook,
};
