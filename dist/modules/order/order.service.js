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
exports.calculateTotalRevenue = exports.createOrderToDb = exports.getOrdersFromDb = void 0;
const order_model_1 = require("./order.model");
const getOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return order_model_1.Order.find()
            .populate({
            path: "product",
            select: "-createdAt -updatedAt -__v",
        })
            .exec();
    }
    catch (error) {
        throw error;
    }
});
exports.getOrdersFromDb = getOrdersFromDb;
// create an order
const createOrderToDb = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new order_model_1.Order(order);
        return newOrder.save();
    }
    catch (error) {
        throw error;
    }
});
exports.createOrderToDb = createOrderToDb;
//caculate total revenue from orders
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield order_model_1.Order.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "bike",
                },
            },
            {
                $unwind: "$bike",
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: { $multiply: ["$bike.price", "$quantity"] },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);
        return response[0];
    }
    catch (error) {
        throw error;
    }
});
exports.calculateTotalRevenue = calculateTotalRevenue;
