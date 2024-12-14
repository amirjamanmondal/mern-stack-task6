import express from "express";
import addProduct from "../controllers/product/addProduct.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../helpers/imageUpload.js";

const sellerRoute = express.Router();

sellerRoute.post(
  "/addProduct",
  isAuthenticated,
  upload.single("image"),
  addProduct
);

export default sellerRoute;
