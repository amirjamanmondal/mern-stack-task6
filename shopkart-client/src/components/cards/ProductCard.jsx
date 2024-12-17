import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  const description = product.description;

  // const countWord = description.length;

  async function handleAddtoCart(e, id) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/user/addToCart/${id}`,
        {},
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(product);

  return (
    <div className="w-56 h-fit px-4 py-4 text-start  bg-white rounded-lg shadow-lg border flex justify-center items-center flex-col gap-2">
      <img
        src={product.image}
        alt="product"
        className="w-full h-20 object-contain "
      />
      <h1 className="w-full">{product.name}</h1>
      <h3 className="w-full">price: {product.price}/-</h3>
      <p className="w-full">{product.category}</p>

      {/* <p className="w-full">
        {countWord >= 10 ? description.slice(0, 22) + " " : description}
      </p> */}
      <div className="w-full flex justify-between items-center gap-2">
        <button
          className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
          onClick={(e) => handleAddtoCart(e, product._id)}
        >
          Add Cart
        </button>

        <button className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
