"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler_1 = __importDefault(require("./middleweres/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.default);
// Testing
// app.get('/', async (req: Request, res: Response) => {
//   Promise.reject(new Error('unhandled promise rejection'));
// });
// global error handle
app.use(globalErrorHandler_1.default);
// handle not found route
app.use((req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
