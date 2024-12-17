import Product from "../../models/productModel.js";
import Cart from "../../models/cartModel.js";

async function addToCart(req, res) {
  try {
    const productId = req.params.id;
    const user = req.user;

    // Check if the user is a seller
    if (user.userType === "seller") {
      return res.status(403).json("Sellers cannot add products to the cart");
    }

    // Fetch the product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: user._id });
    let updatedProduct;

    if (cart) {
      // Check if the product already exists in the cart
      const productInCart = cart.products.find(
        (item) => item.product.toString() === product._id.toString()
      );

      if (productInCart) {
        // Increment quantity and update total price
        productInCart.quantity++;
        productInCart.pricePerQty = product.price;
        productInCart.totalPrice = productInCart.quantity * product.price;
        updatedProduct = productInCart;
      } else {
        // Add new product to the cart
        const newProduct = {
          product: product._id,
          quantity: 1,
          pricePerQty: product.price,
          totalPrice: product.price,
        };
        cart.products.push(newProduct);
        updatedProduct = newProduct;
      }

      // Save the updated cart
      await cart.save();
    } else {
      // Create a new cart if it doesn't exist
      const newProduct = {
        product: product._id,
        quantity: 1,
        pricePerQty: product.price,
        totalPrice: product.price,
      };
      cart = new Cart({
        user: user._id,
        products: [newProduct],
      });
      await cart.save();

      updatedProduct = newProduct;
    }

    // Populate the added/updated product details
    const populatedProduct = await Cart.populate(updatedProduct, {
      path: "product",
      select: "name price image",
    });

    return res.status(201).json({
      message: "Product added/updated successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}

export default addToCart;
