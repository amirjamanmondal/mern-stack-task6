import React from "react";
import Button from "../common/Button";

const ProductCard = ({ product }) => {
  const description = product.description;
  const countWord = description.length;
  console.log(product);

  return (
    <div className="w-56 h-fit px-4 py-4 text-start  bg-white rounded-lg shadow-lg border flex justify-center items-center flex-col gap-2">
      <img
        src={product.image}
        alt="product"
        className="w-full h-20 object-contain "
      />
      <h1 className="w-full">{product.name}</h1>
      <h3 className="w-full">price: {product.price}/-</h3>
      <p className="w-full">{product.category}</p>

      {/* <p className="w-full">
        {countWord >= 10 ? description.slice(0, 22) + " " : description}
      </p> */}
      <div className="w-full flex justify-between items-center gap-2">
        <Button value={"Add Cart"} />
        <Button value={"Buy now"} />
      </div>
    </div>
  );
};

export default ProductCard;
