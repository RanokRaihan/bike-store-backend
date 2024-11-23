"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const db_1 = __importDefault(require("./db"));
const port = config_1.PORT || 3000;
// Connect to MongoDB
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
});
