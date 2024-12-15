import Cart from "../../models/cartModel.js";
import Order from '../../models/orderModel.js'

async function orderProduct(req, res) {
  try {
    const user = req.user;
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: user._id });


    cart.products.forEach((item)=>{
        if (item.product===productId) {
            new Order({
                
            })
        }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
