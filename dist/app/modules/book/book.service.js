"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield book_model_1.Book.create(payload)).populate('user');
    return result;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({});
    return result;
});
const getASingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOne({ _id: id });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const isExistBook = await Book.findOne({ _id: id });
    // const user = isExistBook?.user.toString();
    // // verify token
    // let verifiedToken = null;
    // try {
    //   verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    // } catch (error) {
    //   throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid access token');
    // }
    // const { userEmail, id: userId } = verifiedToken;
    // const isExistUser = await User.isExistUser(userEmail);
    // if (!isExistUser) {
    //   throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
    // }
    // if (user === userId) {
    //   const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    //     new: true,
    //   });
    //   return result;
    // } else {
    //   throw new ApiError(
    //     StatusCodes.NOT_FOUND,
    //     'You cannot updated for this book'
    //   );
    // }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const isExistBook = await Book.findOne({ _id: id });
    // const user = isExistBook?.user.toString();
    // // verify token
    // let verifiedToken = null;
    // try {
    //   verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    // } catch (error) {
    //   throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid access token');
    // }
    // const { userEmail, id: userId } = verifiedToken;
    // const isExistUser = await User.isExistUser(userEmail);
    // if (!isExistUser) {
    //   throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
    // }
    // if (user === userId) {
    //   const result = await Book.findOneAndDelete({ _id: id });
    //   return result;
    // } else {
    //   throw new ApiError(
    //     StatusCodes.NOT_FOUND,
    //     'You cannot deleted for this book'
    //   );
    // }
    const result = yield book_model_1.Book.findOneAndDelete({ _id: id });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getASingleBook,
    updateBook,
    deleteBook,
};
