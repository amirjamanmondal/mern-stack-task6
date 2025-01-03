import { useEffect, useState } from "react";
import axios from "axios";
import CartProduct from "../common/CartProduct";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import img from "../../assets/customer.jpg";
import Navbar from "../header/Navbar";
import Profile from "../common/Profile";

const Dashbord = ({ user }) => {
  const address = user?.address;

  const [products, setProducts] = useState(null);
  const [value, setValue] = useState("cart");

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCartProduct() {
      try {
        const res = await axios.get(
          "http://localhost:8000/user/getCartProduct",
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        console.log(data?.products);
        setProducts(data?.products);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCartProduct();
  }, []);
  console.log(products);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:8000/user/logout`,

        {
          withCredentials: true,
        }
      );
      const data = res.data;
      toast(data?.message);
      setTimeout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  function Clicked(e) {
    e.preventDefault();
    setValue(e.target.value);
  }

  return (
    <div className="w-full h-fit flex justify-start flex-col items-start gap-2 bg-gray-400">
      <Navbar />
      <div className="w-full min-h-screen flex flex-row gap-2">
        <div className="w-44 h-fit p-4 flex flex-col justify-start gap-2">
          <button
            value={"cart"}
            className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
            onClick={(e) => Clicked(e)}
          >
            Cart
          </button>

          <button
            value={"address"}
            className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
            onClick={(e) => Clicked(e)}
          >
            Address
          </button>
          <button
            className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>

        <div className="w-1/2 h-fit flex flex-col justify-start gap-2">
          {/* {products && products.length === 0 && value === "cart" && <div className="w-full h-fit flex flex-col justify-center items-center">Your Cart is Empty</div>} */}
          {value === "cart" ? (
            !products || products.length === 0 ? (
              <div className="w-full py-4 text-xl bg-yellow-300 flex flex-col justify-center items-center">
                Your Cart is Empty
              </div>
            ) : (
              products.map((product) => {
                return (
                  <div key={product._id}>
                    <CartProduct
                      product={product.product}
                      qty={product.quantity}
                    />
                  </div>
                );
              })
            )
          ) : (
            ""
          )}

          {value === "address" && (
            <div className="w-full h-fit flex flex-col justify-start gap-2 bg-yellow-300 p-6">
              {address}
            </div>
          )}
        </div>
      </div>

      {/* <Profile user={user} /> */}
    </div>
  );
};

export default Dashbord;

