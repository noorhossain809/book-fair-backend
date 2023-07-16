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
exports.UserService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check existing user
    const isExistUser = yield user_model_1.User.isExistUser(email);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    // password match
    if (isExistUser.password &&
        !(yield user_model_1.User.isPasswordMatch(password, isExistUser.password))) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Password does not match');
    }
    // create access token
    const { email: userEmail, id } = isExistUser;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
exports.UserService = {
    createUser,
    loginUser,
};
