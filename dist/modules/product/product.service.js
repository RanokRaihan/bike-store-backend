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
exports.insertManyBikesToDb = exports.deleteSingleBikeFromDb = exports.updateBikeToDb = exports.getSingleBikeFromDb = exports.getAllProductsFromDb = exports.createProductToDb = void 0;
const product_model_1 = __importDefault(require("./product.model"));
//create a bike in the database
const createProductToDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new product_model_1.default(product);
        yield newProduct.save();
        return newProduct;
    }
    catch (error) {
        throw error;
    }
});
exports.createProductToDb = createProductToDb;
//get all the bikes from the database
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        return products;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllProductsFromDb = getAllProductsFromDb;
//get a single bike from the database
const getSingleBikeFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bike = yield product_model_1.default.findById(id);
        return bike;
    }
    catch (error) {
        throw error;
    }
});
exports.getSingleBikeFromDb = getSingleBikeFromDb;
// update bike data in the db
const updateBikeToDb = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBike = yield product_model_1.default.findByIdAndUpdate(id, updateData, {
            runValidators: true,
            new: true,
        });
        return updatedBike;
    }
    catch (error) {
        throw error;
    }
});
exports.updateBikeToDb = updateBikeToDb;
//delete one bike data
const deleteSingleBikeFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ id });
        const deletedBike = product_model_1.default.findOneAndDelete({ _id: id });
        return deletedBike;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteSingleBikeFromDb = deleteSingleBikeFromDb;
//extra: insert many bikes
const insertManyBikesToDb = (bikes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertedBikes = yield product_model_1.default.insertMany(bikes);
        return insertedBikes;
    }
    catch (error) {
        throw error;
    }
});
exports.insertManyBikesToDb = insertManyBikesToDb;
