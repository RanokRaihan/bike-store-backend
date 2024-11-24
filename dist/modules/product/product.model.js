"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required!"],
        validate: {
            validator: (value) => value.trim().length > 0,
            message: "Product name cannot be empty",
        },
    },
    brand: {
        type: String,
        required: [true, "Brand is required!"],
        validate: {
            validator: (value) => value.trim().length > 0,
            message: "Brand cannot be empty!",
        },
    },
    price: {
        type: Number,
        required: [true, "Price is required!"],
        min: [0, "Price must be a positive number!"],
    },
    category: {
        type: String,
        enum: {
            values: ["Mountain", "Road", "Hybrid", "Electric"],
            message: "Category must be either Mountain, Road, Hybrid, or Electric",
        },
        required: [true, "Category is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        validate: {
            validator: (value) => value.trim().length > 10,
            message: "Description must be at least 10 characters!",
        },
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required!"],
        min: [0, "Quantity must be a positive number!"],
        validate: {
            validator: (value) => Number.isInteger(value),
            message: "Quantity must be an integer!",
        },
    },
    inStock: {
        type: Boolean,
        required: [true, "InStock status is required!"],
    },
}, {
    timestamps: true,
});
productSchema.pre("save", function (next) {
    this.inStock = this.quantity > 0;
    next();
});
//update inStock status before updating the document
productSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.quantity !== undefined) {
        if (update.quantity > 0) {
            update.inStock = true;
        }
        else {
            update.inStock = false;
        }
        this.setUpdate(update);
    }
    next();
});
const Product = model("Product", productSchema);
exports.default = Product;
