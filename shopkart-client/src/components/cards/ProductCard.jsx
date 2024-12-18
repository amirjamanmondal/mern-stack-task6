import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ product, user }) => {
  const description = product.description;
  const [seller, setSeller] = useState(null);
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
  const discount = () => {
    const discountedPrice = product.price - product.price / 100;
    return Math.round(discountedPrice);
  };
  const price = discount();
  console.log(user.userType);
  
  

  useEffect(() => {
    async function fetchSeller(id) {
      try {
        const res = await axios.get(`http://localhost:8000/user/searchName/${id}`, {
          withCredentials: true,
        });
        const data = res.data;
        setSeller(data);
        console.log(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeller(product.seller);
  }, []);

  // console.log(product);

  return (
    <div className="w-56 h-fit px-4 py-4 text-start  bg-white rounded-lg shadow-lg border flex justify-center items-center flex-col gap-2">
      <img
        src={product.image}
        alt="product"
        className="w-full h-20 object-contain"
      />
      <h1 className="w-full">{product.name}</h1>
      <p className="w-full">{product.category}</p>
      <h3 className="w-full">
        price:{" "}
        <span className="text-red-600 line-through">{product.price}/-</span>{" "}
        <span className="text-green-500  w-fit h-fit ">
          {price}
          /-
        </span>
      </h3>

      <h4 className="w-full text-blue-400">Seller: <span className="text-green-500 font-mono font-semibold">{seller?.user?.name}</span></h4>
      {/* <p className="w-full">
        {countWord >= 10 ? description.slice(0, 22) + " " : description}
      </p> */}
      {user?.userType === "customer" ? (
        <div className="w-full flex justify-between items-center gap-2 ">
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
      ):""}
    </div>
  );
};

export default ProductCard;
