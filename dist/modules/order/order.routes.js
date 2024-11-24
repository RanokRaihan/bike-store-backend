"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
//get all orders
router.get("/", order_controller_1.getAllOrders);
// place a new order
router.post("/", order_controller_1.placeOrder);
//calculate total revenue
router.get("/revenue", order_controller_1.getTotalRevenue);
exports.default = router;
