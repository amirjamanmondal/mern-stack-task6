import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ product, user }) => {
  const [seller, setSeller] = useState(null);

  async function handleAddtoCart(e, id) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/user/addToCart/${id}`,
        {},
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const discount = () => {
    const discountedPrice = product.price - product.price / 100;
    return Math.round(discountedPrice);
  };
  const price = discount();
  console.log(user?.userType);

  useEffect(() => {
    async function fetchSeller(id) {
      try {
        const res = await axios.get(
          `http://localhost:8000/user/searchName/${id}`,
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        setSeller(data);
        console.log(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeller(product.seller);
  }, []);

  return (
    <div className="w-56 h-fit px-4 py-4 text-start  bg-white rounded-lg shadow-lg border flex justify-center items-center flex-col gap-2">
      <img
        src={product.image}
        alt="product"
        className="w-full h-20 object-contain"
      />
      <h1 className="w-full">{product.name}</h1>
      <p className="w-full">{product.category}</p>
      <h3 className="w-full">
        price:{" "}
        <span className="text-red-600 line-through">{product.price}/-</span>{" "}
        <span className="text-green-500  w-fit h-fit ">
          {price}
          /-
        </span>
      </h3>

      <h4 className="w-full text-blue-400">
        Seller:{" "}
        <span className="text-green-500 font-mono font-semibold">
          {seller?.user?.name}
        </span>
      </h4>
      {user?.userType === "customer" ? (
        <div className="w-full flex justify-between items-center gap-2 ">
          <button
            className="w-full h-fit text-md bg-yellow-400 rounded-md hover:bg-green-700 flex justify-center items-center"
            onClick={(e) => handleAddtoCart(e, product._id)}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAlNJREFUWEftlztoVUEQhr+ICqaw0SKQVIbgA2zsDEhSSKwk2BjUSotYiPa+UIlgOiFF0BRa+SoU0lgoiEmhFsHCBxgIWoiPWhBDVMz5Ya8sJ7tnH+cEbpFtbrEz/3x3Znd2TgdttjrajIc1oFBFyhm6bDn8Ap4Bc8C/kFBT+2UgV+C7wLGmAoZ0YoCkcRS4FxJrYr+qZHuAgybIS6C/iYAhjapb1gV8BtYbkd3Au5Bg3f3QtX8AHDZBJoFTdQOG/ENA+4BZI/IDuB4STNxfBB4Db1p+ISDZyVjlWq31F9gE/FaAGKCTwI3VogG+AD0pGeoEvgGbI6BmgOfGbhAYiPC5BpxLAZLtBHA6QvxKYdPq9vq9FOGzDfiUCtQLLESIpwK9AvbaujFnqGX/FNjvgLLLpHLZJVPZtHzl0/mcygU6BDxyANlZ8SXRVT5d+a3Az1ygdeZGqIPbKxfoPnCk/A9SSibf88VTcrUkkluyA8X7+KQu0Bbgu/W+lfViD/VX03tWjDupGRLAHTOOuM5LLNA4cNYlkAOka/rCc3pjG2Ofr43kAInlPbAroi+5TFb0ntxbZvvpdmi0zVkah72+uRkSyAiwM5HobTE5PKzyqQOUyBJnXgfoJnAc+AiccfUUgzBkHmc9oreLyUHPhXflAgnklqU6D+zwRPlQfLFst/ZOGDCneS7QBWDMUtS0t9EDtARssPYuOrr9/+1cII20r62OrRfbVwqVdtRE/APo80qHu9EMSUxQw+bB1dmoWipxNzBdBSOB3AzFXZkMqzWgUNLaLkPLSj5iJQgfdtsAAAAASUVORK5CYII="
              className="size-10"
            />
          </button>

          <button className="w-full h-fit text-md bg-yellow-400 rounded-md hover:bg-green-700 flex justify-center items-center">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAcFJREFUWEft17tqVUEUxvFfvGChAQsRFS0skkJ8Ay0s9C0URC3sVCyEqEhABEXU1kbBwkbfQBsb30BBIaTwgoKFoIGA17NkTthscs7M2U6RwJ7mwMxa3/rvb65nyhprU2uMRw+Um5HeoUkduoB5TOcSK41/wzXcHeq1p+w7tlYqViqzhG2jgP6UqlSOWzGm7dC6AbqOX8mVq9hQ6FDkRG60jbgyIm9ih3bhcxL7iN2FQO+xL8XuwYdaQEfwIok9xMlCoPs4m2KP4lktoFu4lMRm8TpNwTiuZUTsuxR0D+dqAX3BfsSxEC3OqzsZl04h3Iy2HYvpd7W0iddQiATAxYZaFLyJHa0KsU7O42mjPzfNnYBC/zQeNAptwQnsTX1v8GSwm342YuIjbmfc7AwU59SZFtS4Wpcb235cXGegoehz3Eg773er0mYcw9xgVx0q3I3/DTSs8xUv8XbgxCbM4HCH+7AaUKEB2bAeKGdR71DvUM6B3Pj6WUM/0gGX+6Ka43Hvxen+r7Xf1K9woGa1Aq2oeXAU0HE8WgW0QLdTSNyD8Vp4PAoo+uM+istxZ6cS5Umf0pN2oZnS/7fPGdg7lHPoL4VXTSWM0mESAAAAAElFTkSuQmCC" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductCard;
