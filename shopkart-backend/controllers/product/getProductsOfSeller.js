import Product from "../../models/productModel.js";

async function getProductsOfSeller(req, res) {
  try {
    const id = req.user._id;
    const products = await Product.find({ seller: id });
    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default getProductsOfSeller;
