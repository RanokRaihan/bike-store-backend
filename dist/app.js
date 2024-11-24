"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const order_routes_1 = __importDefault(require("./modules/order/order.routes"));
const product_routes_1 = __importDefault(require("./modules/product/product.routes"));
// Create Express app
const app = (0, express_1.default)();
// Express configuration
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// define routes
app.use("/api/products", product_routes_1.default);
app.use("/api/orders", order_routes_1.default);
//global error handler
app.use((error, req, res, next) => {
    console.log({ whatError: error });
    const statusCode = (error === null || error === void 0 ? void 0 : error.name) === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
        message: error.message || "Something went wrong",
        success: false,
        error: (error === null || error === void 0 ? void 0 : error.errors) || error,
        stack: error.stack,
    });
});
exports.default = app;
