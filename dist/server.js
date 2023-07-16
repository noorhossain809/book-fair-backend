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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
process.on('uncaughtException', error => {
    console.log('Uncought exceptinal is detected, we are closing our server.......');
    console.error(error);
    process.exit(1);
});
let server;
function boostrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.info('Database is connected successfully!!!');
            server = app_1.default.listen(config_1.default.port, () => {
                console.info(`Application listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.error('Failed to database connect!');
        }
        process.on('unhandledRejection', error => {
            console.log('Unhandled rejection is detected, we are closing our server.......');
            if (server) {
                server.close(() => {
                    console.error(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
boostrap();
process.on('SIGTERM', () => {
    console.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});
