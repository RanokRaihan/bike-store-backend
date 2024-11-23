import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import productsRouter from "./modules/product/product.routes";
// Create Express app
const app: Application = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// define routes
app.use("/api/products", productsRouter);

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log({ whatError: error });
  const statusCode: number = error?.name === "ValidationError" ? 400 : 500;
  res.status(statusCode).json({
    message: error.message || "Something went wrong",
    success: false,
    error: error?.errors || error,
    stack: error.stack,
  });
});

export default app;
