import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../cards/ProductCard";

const Home = ({ user }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`http://localhost:8000/user/getProduct`, {
          withCredentials: true,
        });
        const data = res.data;
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-fit bg-white flex flex-col items-start justify-start">
      <div className="w-full flex gap-2 flex-wrap my-4 px-4">
        {products && products.length === 0 && <div>No Products Found</div>}
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <ProductCard key={product._id} product={product} user={user} />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
