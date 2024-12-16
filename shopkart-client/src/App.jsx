import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import AddProduct from "./components/forms/AddProduct";
import ProductCard from "./components/forms/ProductCard";
import Signup from "./components/auth/Signup";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import Dashbord from "./components/pages/Dashbord";

const App = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    async function checkUser() {
      const res = await axios.get("http://localhost:8000/user/", {
        withCredentials: true,
      });
      const data = res.data;
      if (data) {
        setName(data.user.name);
      }
    }
    checkUser();
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100">
      <Navbar name={name} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
