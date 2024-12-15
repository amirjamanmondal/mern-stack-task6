import React, { useState } from "react";
import Button from "../common/Button";
import TextFeild from "../common/TextFeild";
import UploadImage from "../common/UploadImage";

const AddProduct = () => {
  // const { name, description, price, category, countInStock } = req.body;
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  return (
    <form className="w-full h-fit flex flex-col gap-4 px-10">
      <UploadImage file={file} setFile={setFile} />

      <TextFeild
        type={"text"}
        placeholder={"Name"}
        value={name}
        id={"name"}
        setValue={setName}
      />
      <textarea
        type="text"
        placeholder="Description"
        value={description}
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        rows={"4"}
        className="p-2 resize-none"
      />
      <TextFeild
        type={"number"}
        placeholder={"Price"}
        value={parseInt(price)}
        id={"price"}
        setValue={setPrice}
      />
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        type={"number"}
        placeholder={"Count in Stock"}
        value={parseInt(countInStock)}
        id={"countInStock"}
        setValue={setCountInStock}
      />
      <Button value={"Add Product"} />
    </form>
  );
};

export default AddProduct;
