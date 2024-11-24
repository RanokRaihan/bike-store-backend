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
exports.insertManyBikes = exports.deleteSingleBike = exports.updateBike = exports.getSingleBike = exports.getAllBikes = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const newProduct = yield (0, product_service_1.createProductToDb)(product);
        res.status(201).json({
            message: "Bike created successfully!",
            success: true,
            data: newProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
//get all bikes
const getAllBikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //call the service function
        const bikes = yield (0, product_service_1.getAllProductsFromDb)();
        //send the response
        res.status(200).json({
            message: "All bikes fetched successfully",
            success: true,
            data: bikes,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBikes = getAllBikes;
// get a single bike
const getSingleBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the bike id
        const { productId } = req.params;
        //call the service function
        const bike = yield (0, product_service_1.getSingleBikeFromDb)(productId);
        if (!bike) {
            throw new Error("Bike not found!");
        }
        //send the response
        res.status(200).json({
            message: "Bike fetched successfully!",
            success: true,
            data: bike,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleBike = getSingleBike;
//update a bike
const updateBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the bike id
        const { productId } = req.params;
        //get the update data
        const updateData = req.body;
        //check if the bike exists
        const bike = yield (0, product_service_1.getSingleBikeFromDb)(productId);
        if (!bike) {
            throw new Error("Update failed! Bike not found!");
        }
        // check if the update data is empty
        if (Object.keys(updateData).length === 0) {
            throw new Error("Update data cannot be empty!");
        }
        // check update data for invalid fields
        const allowedFields = [
            "name",
            "brand",
            "price",
            "category",
            "description",
            "quantity",
            "inStock",
        ];
        const productFields = Object.keys(updateData);
        const invalidFields = productFields.filter((field) => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Update failed! fields: ${invalidFields.join(", ")} - does not exist in the product model`);
        }
        //call the service function
        const updatedBike = yield (0, product_service_1.updateBikeToDb)(productId, updateData);
        //send the response
        res.status(200).json({
            message: "Bike updated successfully",
            success: true,
            data: updatedBike,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBike = updateBike;
//delete a bike
const deleteSingleBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the bike id
        const { productId } = req.params;
        // check if the bike exists
        const bike = yield (0, product_service_1.getSingleBikeFromDb)(productId);
        if (!bike) {
            res.status(404).json({
                message: "Bike not found!",
                success: false,
                data: null,
            });
        }
        //call the service function
        const deletedBike = yield (0, product_service_1.deleteSingleBikeFromDb)(productId);
        //send the response
        res.status(200).json({
            message: "Bike deleted successfully",
            success: true,
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSingleBike = deleteSingleBike;
// insert many bikes
const insertManyBikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the bikes
        const bikes = req.body;
        //call the service function
        const insertedBikes = yield (0, product_service_1.insertManyBikesToDb)(bikes);
        //send the response
        res.status(201).json({
            message: "Bikes inserted successfully",
            success: true,
            data: insertedBikes,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.insertManyBikes = insertManyBikes;
