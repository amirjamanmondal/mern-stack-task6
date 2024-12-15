import Product from "../../models/productModel.js";
import Cart from "../../models/cartModel.js";

async function addToCart(req, res) {
  try {
    const id = req.params.id;
    const user = req.user;
    const product = await Product.findById(id);

    if (user.userType === "seller") {
      res.status(403).json("Seller can't add product to cart");
      return;
    }

    if (!product) {
      return res.status(404).json("Product not found");
    }

    const cart = await Cart.findOne({
      user: user._id,
      products: { $elemMatch: { product: product._id } },
    });

    if (cart) {
      cart.products.forEach((item) => {
        if (item.product.toString() === product._id.toString()) {
          item.quantity++;
        }
      });
      await cart.save();
    } else {
      const newCart = new Cart({
        user: user._id,
        products: [
          {
            product: product._id,
            quantity: 1, // Default quantity
          },
        ],
      });

      await newCart.save();
    }

    // Calculate totalPrice using aggregation
    const updatedCart = await Cart.aggregate([
      { $match: { user: user._id } }, // Match the user's cart
      { $unwind: "$products" }, // Deconstruct the products array
      {
        $lookup: {
          from: "products", // Reference the Product collection
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Deconstruct the productDetails array
      {
        $addFields: {
          "products.totalPrice": {
            $multiply: ["$products.quantity", "$productDetails.price"],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          products: { $push: "$products" },
        },
      },
    ]);

    return res.status(201).json(updatedCart[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default addToCart;
