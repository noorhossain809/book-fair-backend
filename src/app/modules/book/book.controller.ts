import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendRequest';
import { StatusCodes } from 'http-status-codes';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book added successfully',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getASingleBook(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
};
