"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.PORT = exports.MONGODB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
_a = process.env, exports.MONGODB_URI = _a.MONGODB_URI, exports.PORT = _a.PORT, exports.DB_NAME = _a.DB_NAME;
