import React, { useEffect, useState } from "react";
import ProductCard from "../forms/ProductCard";
import axios from "axios";

const CartProduct = ({ product, qty,totalPrice }) => {
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

  return (
    <div className="w-full h-32 flex gap-6 text-lg text-start bg-gray-300 shadow-lg px-4 py-2 ">
      <img
        src={productData?.image}
        alt="product"
        className="w-30 h-full object-contain mix-blend-multiply"
      />
      <div className="w-fit h-full flex justify-center items-center text-center flex-col gap-2 ">
        {productData?.name}
      </div>
      <p className="w-fit h-full flex justify-center items-center text-center flex-col gap-2 ">
        {qty}
      </p>
      <p className="w-fit h-full flex justify-center items-center text-center flex-col gap-2 text-blue-600">
        {productData?.price}/-
      </p>
      <p className="w-fit h-full flex justify-center items-center text-center flex-col gap-2 text-red-600">
        {" "}
        {totalPrice}
      </p>
    </div>
  );
};

export default CartProduct;
