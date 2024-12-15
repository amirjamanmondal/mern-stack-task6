import express from "express";
import addProduct from "../controllers/product/addProduct.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../helpers/imageUpload.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import getProductsOfSeller from "../controllers/product/getProductsOfSeller.js";
import getOneProduct from "../controllers/product/getOneProduct.js";


const sellerRoute = express.Router();

sellerRoute.post(
  "/addProduct",
  isAuthenticated,
  upload.single("image"),
  addProduct
);

sellerRoute.delete("/deleteProduct/:id", isAuthenticated, deleteProduct);

sellerRoute.get("/getProductsOfSeller", isAuthenticated, getProductsOfSeller);

sellerRoute.get("/getOneProduct/:id", isAuthenticated, getOneProduct);



export default sellerRoute;
