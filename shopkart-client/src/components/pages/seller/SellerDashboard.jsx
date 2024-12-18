import React, { useEffect } from "react";
import img from "../../../assets/customer.jpg";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerDashboard = ({ user }) => {
  const [products, setProducts] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/getProductsOfSeller`,
          { withCredentials: true }
        );
        const data = res.data;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  async function deleteProduct({ e, id }) {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8000/user/deleteProduct/${id}`,
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8000/user/logout", {
        withCredentials: true,
      });
      const data = res.data;
      toast(data?.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const discount = (price) => {
    const discountedPrice = price - price / 100;
    return Math.round(discountedPrice);
  };

  return (
    <div className="w-full h-fit flex items-start justify-between gap-4 border-t-4 border-yellow-400">
      <div className="w-1/3 h-fit bg-red-400 flex justify-start items-center">
        <div className="w-full h-fit flex flex-col gap-2 p-6">
          <img
            src={img}
            alt="customerprofile"
            className=" w-32 h-auto rounded-full border-2 border-yellow-400 mix-blend-screen "
          />
          <h1 className="w-full h-fit text-xl font-semibold ">
            Name- {user?.name}
          </h1>
          <h2 className="w-full h-fit text-xl font-semibold">
            Email- {user?.email}
          </h2>
          <h3 className="w-full h-fit text-xl font-semibold">
            Phone- {user?.phone}
          </h3>
          <h4 className="w-full h-fit text-xl font-semibold">
            Role-{" "}
            <span className="w-fit h-fit px-2 py-1 bg-green-700 rounded-md">
              {user?.userType.toUpperCase()}
            </span>
          </h4>
          <button
            className="w-1/3 h-fit p-2 bg-yellow-500 rounded-md hover:bg-green-600 mt-6 text-red-500 font-bold border-2 border-white"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-full h-full flex gap-4 justify-start flex-wrap">
        <nav className="w-full h-fit p-4 bg-gray-400 flex justify-end">
          <NavLink
            to={"/add-product"}
            className="w-fit h-fit p-2 bg-yellow-500 rounded-md hover:bg-green-600"
          >
            Add Product
          </NavLink>
        </nav>
        <hr className="w-full h-1 bg-yellow-300" />
        {products?.map((product) => {
          const price = discount(product?.price);
          return (
            <div
              key={product?._id}
              className="w-80 h-fit text-black font-semibold text-lg shadow-lg p-4 rounded-md bg-white/80 mix-blend-darken flex gap-2 flex-col"
            >
              <img
                src={product?.image}
                alt=""
                className="w-40 h-40 mix-blend-normal"
              />
              <hr className="w-full h-1 bg-yellow-300" />
              <h1 className="w-full">{product?.name}</h1>
              <h2 className="w-full">Base Price {product?.price}</h2>
              <h2 className="w-full">Discounted Price {price}</h2>
              <h2 className="w-full">In Stoke - {product?.countInStock}</h2>
              <h2 className="w-full">Type - {product?.category.toUpperCase()}</h2>
              <button
                className="w-full h-fit p-4 bg-yellow-300 hover:bg-green-600 rounded-xl"
                onClick={(e) => deleteProduct({ e, id: product._id })}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerDashboard;
