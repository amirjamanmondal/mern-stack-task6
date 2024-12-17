import Cart from "../../models/cartModel.js";

async function removeFromCart(req, res) {
  try {
    // Get cart ID from params
    const user = req.user; // Extract user ID from authenticated user
    const { id } = req.params; // Get id from the request params

    if (user.userType === "seller") {
      return res.status(401).json({
        success: false,
        message: "You don't have permission to access this route",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    let productFound = false;

    // Iterate over the products in the cart
    cart.products.forEach((item, index) => {
      if (item.product.toString() === id) {
        productFound = true;

        // If quantity is 1, remove the product
        if (item.quantity === 1) {
          cart.products.splice(index, 1);
        } else {
          // Otherwise, decrement the quantity
          item.quantity -= 1;
        }
      }
    });

    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Save the updated cart
    await cart.save();

    // Recalculate totalPrice for all products in the cart using aggregation
    const updatedCart = await Cart.aggregate([
      { $match: { _id: cart._id } }, // Match the specific cart
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

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCart[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export default removeFromCart;
