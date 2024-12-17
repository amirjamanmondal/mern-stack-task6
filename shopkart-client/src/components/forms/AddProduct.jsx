import React, { useState } from "react";
import TextFeild from "../common/TextFeild";
import UploadImage from "../common/UploadImage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("image", file); // Append the file as part of the request

    try {
      const res = await axios.post(
        "http://localhost:8000/user/addProduct",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Specify multipart form data
          },
        }
      );

      const data = res.data;
      toast(data?.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form className="w-full h-fit flex flex-col gap-4 px-10 my-4">
      <Toaster />
      <UploadImage file={file} setFile={setFile} />
      <TextFeild
        type="text"
        placeholder="Name"
        value={name}
        id="name"
        setValue={setName}
      />
      <textarea
        type="text"
        placeholder="Description"
        value={description}
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        className="resize-none p-2 w-full rounded-lg text-blue-700 font-semibold placeholder:text-blue-700 placeholder:font-semibold border-2 border-blue-700 focus:outline-none focus:border-blue-500"
      />
      <TextFeild
        type="number"
        placeholder="Price"
        value={price}
        id="price"
        setValue={setPrice}
      />
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 w-full rounded-lg text-blue-700 font-semibold placeholder:text-blue-700 placeholder:font-semibold border-2 border-blue-700 focus:outline-none focus:border-blue-500"
      >
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Furniture">Furniture</option>
        <option value="Home">Home</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Office">Office</option>
        <option value="Sports">Sports</option>
        <option value="Toys">Toys</option>
        <option value="Books">Books</option>
      </select>
      <TextFeild
        type="number"
        placeholder="Count in Stock"
        value={countInStock}
        id="countInStock"
        setValue={setCountInStock}
      />
      <button
        type="submit"
        className="w-full h-fit text-center py-2 bg-yellow-300 hover:bg-green-600 rounded-md text-lg font-semibold"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
