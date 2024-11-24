import { NextFunction, Request, Response } from "express";
import { IProduct } from "./product.interface";
import {
  createProductToDb,
  deleteSingleBikeFromDb,
  getAllProductsFromDb,
  getSingleBikeFromDb,
  insertManyBikesToDb,
  updateBikeToDb,
} from "./product.service";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product: IProduct = req.body;
    const newProduct = await createProductToDb(product);
    res.status(201).json({
      message: "Bike created successfully!",
      success: true,
      data: newProduct,
    });
  } catch (error: any) {
    next(error);
  }
};

//get all bikes
export const getAllBikes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //call the service function
    const bikes = await getAllProductsFromDb();

    //send the response
    res.status(200).json({
      message: "All bikes fetched successfully",
      success: true,
      data: bikes,
    });
  } catch (error) {
    next(error);
  }
};

// get a single bike
export const getSingleBike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //get the bike id
    const { productId } = req.params;

    //call the service function
    const bike = await getSingleBikeFromDb(productId);
    if (!bike) {
      throw new Error("Bike not found!");
    }

    //send the response
    res.status(200).json({
      message: "Bike fetched successfully!",
      success: true,
      data: bike,
    });
  } catch (error) {
    next(error);
  }
};

//update a bike
export const updateBike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //get the bike id
    const { productId } = req.params;

    //get the update data
    const updateData: Partial<IProduct> = req.body;

    //check if the bike exists
    const bike = await getSingleBikeFromDb(productId);
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
    const invalidFields = productFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      throw new Error(
        `Update failed! fields: ${invalidFields.join(
          ", "
        )} - does not exist in the product model`
      );
    }

    //call the service function
    const updatedBike = await updateBikeToDb(productId, updateData);

    //send the response
    res.status(200).json({
      message: "Bike updated successfully",
      success: true,
      data: updatedBike,
    });
  } catch (error) {
    next(error);
  }
};

//delete a bike
export const deleteSingleBike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //get the bike id
    const { productId } = req.params;
    // check if the bike exists
    const bike = await getSingleBikeFromDb(productId);
    if (!bike) {
      res.status(404).json({
        message: "Bike not found!",
        success: false,
        data: null,
      });
    }
    //call the service function
    const deletedBike = await deleteSingleBikeFromDb(productId);

    //send the response
    res.status(200).json({
      message: "Bike deleted successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// insert many bikes
export const insertManyBikes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //get the bikes
    const bikes: IProduct[] = req.body;

    //call the service function
    const insertedBikes = await insertManyBikesToDb(bikes);

    //send the response
    res.status(201).json({
      message: "Bikes inserted successfully",
      success: true,
      data: insertedBikes,
    });
  } catch (error) {
    next(error);
  }
};
