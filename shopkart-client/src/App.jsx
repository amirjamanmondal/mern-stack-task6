import { useState, useEffect, useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import AddProduct from "./components/forms/AddProduct";
// import ProductCard from "./components/cards/ProductCard";
import Signup from "./components/auth/Signup";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import Dashbord from "./components/pages/Dashbord";
import reducer from "./components/helper/hooks";
import NotFound from "./components/pages/NotFound";
import SliderImage from "./components/common/SliderImage";
import SellerDashboard from "./components/pages/seller/SellerDashboard";

const initialState = {
  products: [],
};

const App = () => {
  const [user, setUser] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkUser() {
      try {
        const res = await axios.get("http://localhost:8000/user/", {
          withCredentials: true,
        });
        const data = res.data;
        if (data) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Unauthorized access");
        
        if (location.pathname !== "/signup" && location.pathname !== "/login") {
          navigate("/login");
        }
      }
    }
    checkUser();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100">
      <Navbar user={user ? user : ""} />
      {location.pathname !== "/signup" && !user && <SliderImage />}
      <Routes>
        <Route path="/" element={<Home state={state} dispatch={dispatch} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/add-product"
          element={user?.userType === "seller" ? <AddProduct /> : <NotFound />}
        />
        <Route
          path="/dashbord"
          element={
            user?.userType === "customer" ? (
              <Dashbord state={state} dispatch={dispatch} user={user} />
            ) : (
              <NotFound />
            )
          }
        />
        <Route
          path="/seller-profile"
          element={<SellerDashboard user={user} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
