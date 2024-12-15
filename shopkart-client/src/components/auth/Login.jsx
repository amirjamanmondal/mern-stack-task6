import React from "react";
import TextFeild from "../common/TextFeild";
import Button from "../common/Button";
const Login = () => {
  // email , password , userType
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userType, setUserType] = React.useState("");
  return (
    <form className="w-fit h-fit mx-auto flex flex-col gap-4 p-4">
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
      <h1 className="w-full text-sm">don't have an account? <a href="/signup">Signup</a></h1>
      <Button value={"Login"} />
    </form>
  );
};

export default Login;
