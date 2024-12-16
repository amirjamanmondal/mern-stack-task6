import productModel from "../../models/productModel.js";

async function addProduct(req, res) {
  try {
    console.log(req.file);
    console.log(req.body);

    const { name, description, price, category, countInStock } = req.body;
    const image = req.file.filename; // get the image path from the request body

    if (!name || !description || !price || !countInStock) {
      res.status(400).json("Please fill all the fields");
      return;
    }
    const user = req.user;

    if (user.userType !== "seller") {
      res.status(401).json("You are not authorized to add a product");
      return;
    }
    const seller = user._id; // get the seller id from the user

    const product = new productModel({
      name,
      description,
      seller: seller,
      price,
      image: `http://localhost:8000/uploads/products/${image}`,

      countInStock,
    });
    await product.save();
    if (!product) {
      res.status(500).json("Error while adding product");
      return;
    }
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default addProduct;
