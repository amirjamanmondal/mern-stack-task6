import Product from "../../models/productModel.js";

async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort("-createdAt");
    if (products.length === 0) {
      res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({
      success: true,
      message: " All products fetched successfully",
      products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export default getAllProducts;
