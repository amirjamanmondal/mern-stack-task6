import fs from "fs";
import path from "path";
import Product from "../../models/productModel.js";

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get the file path from the product
    const filePath = product.image; // e.g., http://localhost:8000/uploads/products/image.jpg
    console.log("Original filePath:", filePath);

    // Extract the relative file path after "8000"
    const relativePath = filePath.split("products/")[1]; // Get "/uploads/products/image.jpg"
    console.log("Relative Path:", relativePath);

    // Check if the file exists
    if (fs.existsSync(`./upload/products/${relativePath}`)) {
      fs.unlinkSync(`./upload/products/${relativePath}`);
      console.log("File deleted successfully.");
    } else {
      console.log("File does not exist.");
      return res.status(404).json({ message: "File not found on server" });
    }

    // Delete the product document from the database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and file deleted successfully" });
  } catch (error) {
    console.error("Error while deleting product:", error);
    res.status(500).json({ message: error.message });
  }
}

export default deleteProduct;
