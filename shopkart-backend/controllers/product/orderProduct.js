import Cart from "../../models/cartModel";

async function orderProduct(req, res) {
  try {
    const user = req.user;
    const cart = await Cart.findOne({ user: user._id });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
