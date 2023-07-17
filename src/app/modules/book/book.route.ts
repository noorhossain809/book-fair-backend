import express from 'express';
import validateRequest from '../../../middleweres/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
