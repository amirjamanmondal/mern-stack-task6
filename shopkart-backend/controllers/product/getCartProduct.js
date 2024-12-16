import Cart from "../../models/cartModel.js";

async function getCartProduct(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default getCartProduct;
