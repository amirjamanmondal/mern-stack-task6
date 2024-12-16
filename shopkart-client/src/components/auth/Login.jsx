import React, { useReducer } from "react";
import TextFeild from "../common/TextFeild";
import Button from "../common/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  userType: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_USER_TYPE":
      return { ...state, userType: action.payload };
    default:
      return state;
  }
}

const Login = () => {
  // useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  // Destructure state variables
  const { email, password, userType } = state;

  async function handleLogin() {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/login",
        { email, password, userType },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      console.log(data.user);
      
      // localStorage.setItem("user", JSON.stringify(data.user.email));
      toast(data.message);
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="w-fit h-fit mx-auto flex flex-col gap-4 p-4">
      <TextFeild
        type="email"
        name="email"
        placeholder="Email"
        id="email"
        value={email}
        setValue={(value) => dispatch({ type: "SET_EMAIL", payload: value })}
      />

      <TextFeild
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        value={password}
        setValue={(value) => dispatch({ type: "SET_PASSWORD", payload: value })}
      />
      <select
        name="userType"
        id="userType"
        value={userType}
        onChange={(e) =>
          dispatch({ type: "SET_USER_TYPE", payload: e.target.value })
        }
      >
        <option value="">Select User Type</option>
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
      </select>
      <h1 className="w-full text-sm">
        Don't have an account? <a href="/signup">Signup</a>
      </h1>
      <button
        className="w-fit h-fit px-4 py-2 bg-yellow-600 hover:bg-green-600 rounded-md flex justify-center items-center "
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </button>
      {/* <Button value={"Login"} onClickHandler={Login} /> */}
    </form>
  );
};

export default Login;
