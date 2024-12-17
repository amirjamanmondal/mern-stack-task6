import React, { useState } from "react";
import Button from "../common/Button";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product, state, dispatch }) => {
  const description = product.description;
  const [productCount, setProductCount] = useState(0);

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
      setProductCount(data.product.quantity);
      dispatch({ type: "ADD_TO_CART", payload: data.product });
      console.log("dispatched ",state);
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
        {productCount === 0 ? (
          <button
            className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
            onClick={(e) => handleAddtoCart(e, product._id)}
          >
            Add Cart
          </button>
        ) : (
          <NavLink
            to={"/dashbord"}
            className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
          >
            Go to Cart
          </NavLink>
        )}
        <Button value={"Buy now"} />
      </div>
    </div>
  );
};

export default ProductCard;
