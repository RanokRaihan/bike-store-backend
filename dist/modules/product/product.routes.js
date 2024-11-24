"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
//create a new bike
router.post("/", product_controller_1.createProduct);
// get all bike data
router.get("/", product_controller_1.getAllBikes);
// get a single bike data
router.get("/:productId", product_controller_1.getSingleBike);
// update a bike data
router.put("/:productId", product_controller_1.updateBike);
//delete a bike data
router.delete("/:productId", product_controller_1.deleteSingleBike);
//
//TEMP: Add this line to the end of the file
// insert many bikes
router.post("/insertMany", product_controller_1.insertManyBikes);
//
exports.default = router;
