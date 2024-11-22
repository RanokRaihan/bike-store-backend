import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Get all products");
});

router.post("/", (req: Request, res: Response) => {
  res.send("Create a product");
});

export default router;
