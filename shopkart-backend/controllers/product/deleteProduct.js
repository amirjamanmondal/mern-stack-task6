import fs from "fs";
import Product from "../../models/productModel.js";

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // http://localhost:8000/uploads/products/
    const filePath = product.image;
    const file = filePath.slice(39, filePath.length);
    console.log(file);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    fs.unlinkSync(file);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default deleteProduct;
