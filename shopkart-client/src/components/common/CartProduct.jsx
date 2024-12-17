import React, { useEffect, useState } from "react";
import axios from "axios";

const CartProduct = ({ product, qty, totalPrice, state, dispatch }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/getOneProduct/${product}`,
          { withCredentials: true }
        );
        const data = res.data;
        console.log(data);
        setProductData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartProduct();
  }, []);

  async function handleRemoveFromCart(e) {
    e.preventDefault();
    try {
      const id = product;
      const res = await axios.delete(
        `http://localhost:8000/user/removeFromCart/${id}`,

        { withCredentials: true }
      );
      console.log(res);
      dispatch({ type: "REMOVE_FROM_CART", payload: { _id: id } });
      console.log("removed",state);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-32 flex justify-around text-lg text-start bg-gray-300 shadow-lg px-4 py-2 ">
      <img
        src={productData?.image}
        alt="product"
        className="w-30 h-full flex justify-start mr-4 object-contain mix-blend-multiply"
      />
      <div className="w-full h-full flex justify-center items-start text-start flex-col gap-2 ">
        {productData?.name}
      </div>

      <p className="w-full h-full flex justify-center items-center text-center flex-col gap-2 text-blue-600">
        {productData?.price}/-
      </p>
      <p className="w-full h-full flex justify-center items-center text-center flex-col gap-2 text-red-600">
        {totalPrice}
      </p>
      <p className="w-full h-full flex justify-center items-center text-center flex-col gap-2 ">
        {qty}
      </p>
      <button
        className="w-full h-full px-2 py-1 text-md text-red-400 rounded-md hover:text-green-700"
        onClick={(e) => handleRemoveFromCart(e)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartProduct;
