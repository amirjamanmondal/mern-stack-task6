import React from "react";

const Button = ({ value, onClickHandler }) => {
  return (
    <button
      className="w-full h-fit px-2 py-1 text-md bg-yellow-400 rounded-md hover:bg-green-700"
      onClick={() => onClickHandler()}
    >
      {value}
    </button>
  );
};

export default Button;
