"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middleweres/validateRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.post('/create-book', (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.get('/', book_controller_1.BookController.getAllBooks);
router.patch('/:id', book_controller_1.BookController.updateBook);
router.delete('/:id', book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
