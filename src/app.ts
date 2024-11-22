import cors from "cors";
import express, { Application } from "express";
import productsRouter from "./modules/product/product.routes";
// Create Express app
const app: Application = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// define routes
app.use("/api/products", productsRouter);

export default app;
