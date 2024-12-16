import Product from "../../models/productModel.js";
import Cart from "../../models/cartModel.js";

async function addToCart(req, res) {
  try {
    const id = req.params.id;
    const user = req.user;
    const product = await Product.findById(id);

    if (user.userType === "seller") {
      return res.status(403).json("Seller can't add product to cart");
    }

    if (!product) {
      return res.status(404).json("Product not found");
    }

    // Find the cart by user ID directly
    const cart = await Cart.findOne({ user: user._id });

    if (cart) {
      // Check if the product already exists in the cart
      const productInCart = cart.products.find((item) => item.product.toString() === product._id.toString());

      if (productInCart) {
        // If product is already in the cart, increment the quantity
        productInCart.quantity++;
      } else {
        // If the product is not in the cart, add it with quantity 1
        cart.products.push({
          product: product._id,
          quantity: 1, // Default quantity
        });
      }

      // Save the updated cart
      await cart.save();
    } else {
      // If the cart doesn't exist, create a new one
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
    res.status(500).json(error);
  }
}

export default addToCart;
