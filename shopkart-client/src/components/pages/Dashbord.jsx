import { useState } from "react";
import axios from "axios";
import Button from "../common/Button";
import CartProduct from "../common/CartProduct";

const Dashbord = ({ state, dispatch }) => {
  const [products, setProducts] = useState(null);
  async function fetchCartProduct() {
    try {
      const res = await axios.get("http://localhost:8000/user/getCartProduct", {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data?.products);
      setProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(products);

  return (
    <div className="w-full h-fit flex justify-start items-start gap-2 p-4 bg-gray-400">
      <div className="w-44 h-fit bg-gray-300 p-4 flex flex-col justify-start gap-2">
        <Button value={"Cart"} onClickHandler={fetchCartProduct} />
        <Button value={"Orders"} onClickHandler={fetchCartProduct} />
        <Button value={"Wishlist"} onClickHandler={fetchCartProduct} />
        <Button value={"Profile"} onClickHandler={fetchCartProduct} />
        <Button value={"Address"} onClickHandler={fetchCartProduct} />
        <Button value={"Logout"} onClickHandler={fetchCartProduct} />
      </div>
      <div className="w-1/2 h-fit flex flex-col justify-start gap-2">
        {products &&
          products.map((product) => {
            return (
              <div key={product._id}>
                <CartProduct
                  product={product.product}
                  qty={product.quantity}
                  totalPrice={product.totalPrice}
                  state={state}
                  dispatch={dispatch}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashbord;
