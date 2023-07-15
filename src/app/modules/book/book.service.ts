import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook) => {
  const result = await Book.create(payload);
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

export const BookService = {
  createBook,
  getAllBooks,
  getASingleBook,
};
