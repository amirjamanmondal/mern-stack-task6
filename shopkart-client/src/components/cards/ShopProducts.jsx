import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "./ProductCard";

const ShopProducts = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`http://localhost:8000/user/getProduct`, {
          withCredentials: true,
        });
        const data = res.data;
        setProducts(data.products);
        console.log(data.products);
        toast(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  if (products && products.length === 0) {
    return <div>No products found</div>;
  }

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-96 flex flex-col bg-green-300">
      <Toaster />
      <div className="w-full h-14 border flex justify-center items-center">
        Filter
      </div>
      <div className="w-full h-fit text-black bg-red-500 flex flex-wrap gap-2 p-4">
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ShopProducts;
