import React from "react";

const TextFeild = ({ type, name, placeholder, value, id, setValue }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      id={id}
      onChange={(e) => setValue(e.target.value)}
      className="px-2"
      autoComplete={type === "email" && "password" ? "on" : "off"}
    />
  );
};

export default TextFeild;
