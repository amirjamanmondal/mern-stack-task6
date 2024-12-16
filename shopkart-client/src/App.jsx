import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import UploadImage from "./components/common/UploadImage";
import AddProduct from "./components/forms/AddProduct";
import ProductCard from "./components/forms/ProductCard";
import Signup from "./components/auth/Signup";
import SliderImage from "./components/common/SliderImage";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get(`http://localhost:8000/user/getProduct`, {
        withCredentials: true,
      });
      const data = res.data;
      setProducts(data.products);
      toast(data.message);
    }
  }, []);

  if (!products) {
    return( <div>Loading...</div>)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100">
      <Toaster />
      <Navbar />
      <div className="w-full h-fit flex items-center justify-evenly flex-wrap gap-4 row-span-3 my-4">
        <SliderImage />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
