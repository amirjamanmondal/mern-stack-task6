import express from "express";
import addProduct from "../controllers/product/addProduct.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../helpers/imageUpload.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import getProductsOfSeller from "../controllers/product/getProductsOfSeller.js";
import getOneProduct from "../controllers/product/getOneProduct.js";
import addToCart from "../controllers/product/addToCart.js";
import getCartProduct from "../controllers/product/getCartProduct.js";
import removeFromCart from "../controllers/product/removeFromCart.js";

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

sellerRoute.post("/addToCart/:id", isAuthenticated, addToCart);

sellerRoute.get("/getCartProduct", isAuthenticated, getCartProduct);

sellerRoute.delete('/removeFromCart/:id', isAuthenticated, removeFromCart);

export default sellerRoute;
