import { Router } from "express";
import {
  createProduct,
  deleteSingleBike,
  getAllBikes,
  getSingleBike,
  updateBike,
} from "./product.controller";

const router = Router();

//create a new bike
router.post("/", createProduct);

// get all bike data
router.get("/", getAllBikes);

// get a single bike data
router.get("/:productId", getSingleBike);

// update a bike data
router.put("/:productId", updateBike);

//delete a bike data
router.delete("/:productId", deleteSingleBike);
//

//
export default router;
