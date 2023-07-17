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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const user_model_1 = require("../user/user.model");
const book_model_1 = require("./book.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
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
const updateBook = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistBook = yield book_model_1.Book.findOne({ _id: id });
    const user = isExistBook === null || isExistBook === void 0 ? void 0 : isExistBook.user.toString();
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid access token');
    }
    const { userEmail, id: userId } = verifiedToken;
    const isExistUser = yield user_model_1.User.isExistUser(userEmail);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    if (user === userId) {
        const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        });
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'You cannot updated for this book');
    }
});
const deleteBook = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistBook = yield book_model_1.Book.findOne({ _id: id });
    const user = isExistBook === null || isExistBook === void 0 ? void 0 : isExistBook.user.toString();
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid access token');
    }
    const { userEmail, id: userId } = verifiedToken;
    const isExistUser = yield user_model_1.User.isExistUser(userEmail);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    if (user === userId) {
        const result = yield book_model_1.Book.findOneAndDelete({ _id: id });
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'You cannot deleted for this book');
    }
});
exports.BookService = {
    createBook,
    getAllBooks,
    getASingleBook,
    updateBook,
    deleteBook,
};
