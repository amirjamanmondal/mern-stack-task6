import React from "react";

const Button = ({ value }) => {
  return (
    <button className="w-full h-fit px-2 py-1 text-md bg-red-400 rounded-md hover:bg-green-700">
      {value}
    </button>
  );
};

export default Button;
