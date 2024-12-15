import React, { useState } from "react";
import TextFeild from "../common/TextFeild";
import Button from "../common/Button";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  console.log(firstName, lastname, email, password, userType);

  return (
    <form className="h-fit w-fit px-8 py-10 rounded-md bg-blue-300 flex flex-col gap-4">
      <TextFeild
        type={"text"}
        name={"firstName"}
        placeholder={"First Name"}
        value={firstName}
        id={"firstName"}
        setValue={setFirstName}
      />

      <TextFeild
        type={"text"}
        name={"lastname"}
        placeholder={"Last Name"}
        value={lastname}
        id={"lastName"}
        setValue={setLastname}
      />

      <TextFeild
        type={"email"}
        name={"email"}
        placeholder={"Email"}
        id={"email"}
        value={email}
        setValue={setEmail}
      />

      <TextFeild
        type={"password"}
        name={"password"}
        placeholder={"Password"}
        id={"password"}
        value={password}
        setValue={setPassword}
      />
      <select
        name="userType"
        id="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="cutomer">Customer</option>
        <option value="seller">Seller</option>
      </select>
      <Button value={"Signup"} />
    </form>
  );
};

export default Signup;
