import React from "react";

const TextFeild = ({ type, name, placeholder, value, id, setValue }) => {
  return (
    <input
      type={
        type === "text"
          ? "text"
          : type === "email"
          ? "email"
          : type === "password"
          ? "password"
          : "number"
      }
      name={name}
      placeholder={placeholder}
      value={value}
      id={id}
      onChange={(e) => setValue(e.target.value)}
      className="p-2 w-full rounded-lg text-blue-700 font-semibold placeholder:text-blue-700 placeholder:font-semibold border-2 border-blue-700 focus:outline-none focus:border-blue-500"
      autoComplete={type === "email" && "password" ? "on" : "off"}
      
    />
  );
};

export default TextFeild;
