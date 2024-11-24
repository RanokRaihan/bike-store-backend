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
exports.getTotalRevenue = exports.placeOrder = exports.getAllOrders = void 0;
const product_service_1 = require("../product/product.service");
const order_service_1 = require("./order.service");
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_service_1.getOrdersFromDb)();
        res.status(200).json({
            message: "All orders fetched successfully",
            success: true,
            data: orders,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        // check if the product exists
        const product = yield (0, product_service_1.getSingleBikeFromDb)(order === null || order === void 0 ? void 0 : order.product);
        if (!product) {
            res.status(404).json({
                message: "Order placing failed. Product not found!",
                success: false,
                data: null,
            });
            return;
        }
        // calculate the total price
        order.totalPrice = order.quantity * product.price;
        // check if the product is in stock
        if (product.quantity < order.quantity) {
            if (product.quantity === 0) {
                throw new Error("Order placing failed. Product is out of stock!");
            }
            throw new Error(`order placing failed. ${order.quantity} bike is not in stock.  Only ${product.quantity} bike left in stock!`);
        }
        // create the order
        const newOrder = yield (0, order_service_1.createOrderToDb)(order);
        if (!newOrder) {
            throw new Error("Order placing failed");
        }
        // update the product quantity
        product.quantity -= order.quantity;
        if (product.quantity === 0) {
            product.inStock = false;
        }
        const updatedProduct = yield product.save();
        if (!updatedProduct) {
            throw new Error("Order placing failed");
        }
        res.status(201).json({
            message: "Order placed successfully!",
            success: true,
            data: newOrder,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.placeOrder = placeOrder;
// calculate total revenue
const getTotalRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield (0, order_service_1.calculateTotalRevenue)();
        res.status(200).json({
            message: "Total revenue fetched successfully!",
            success: true,
            data: totalRevenue,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTotalRevenue = getTotalRevenue;
