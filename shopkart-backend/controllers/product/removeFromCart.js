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

    // Save the updated cart without recalculating totalPrice
    await cart.save();

    // Send response with the updated cart (excluding totalPrice)
    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: cart,
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