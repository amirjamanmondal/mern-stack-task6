import { useState } from "react";
import axios from "axios";
import CartProduct from "../common/CartProduct";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import img from "../../assets/customer.jpg";

const Dashbord = ({ user }) => {
  const address = user?.address;

  const [products, setProducts] = useState(null);
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  async function fetchCartProduct(e) {
    e.preventDefault();
    setValue(e.target.value);
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

  async function handleRemoveFromCart({ e, id }) {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8000/user/removeFromCart/${id}`,

        { withCredentials: true }
      );
      setProducts(products?.filter((item) => item._id !== id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function Clicked(e) {
    e.preventDefault();
    setValue(e.target.value);
  }

  return (
    <div className="w-full h-fit flex justify-start items-start gap-2 p-4 bg-gray-400">
      <div className="w-44 h-fit p-4 flex flex-col justify-start gap-2">
        <button
          value={"cart"}
          className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
          onClick={(e) => fetchCartProduct(e)}
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
                    totalPrice={product.totalPrice}
                    handleRemoveFromCart={handleRemoveFromCart}
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
      <div className="w-fit  h-fit flex flex-col justify-start bg-blue-300 text-white items-start gap-2 p-6">
        <img
          src={img}
          alt="customerprofile"
          className=" w-32 h-auto rounded-full border-2 border-yellow-400 mix-blend-multiply "
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
      </div>
    </div>
  );
};

export default Dashbord;
