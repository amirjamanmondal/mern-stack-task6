import React, { useReducer } from "react";
import TextFeild from "../common/TextFeild";
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
    <form className="w-96 h-fit mx-0 flex flex-col gap-8 p-8 bg-blue-300 shadow-lg border rounded-md my-8">
      <h1 className="w-full flex justify-center text-3xl font-semibold text-blue-700">Login</h1>
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
        className="p-2 w-full rounded-lg text-blue-700 font-semibold border-2 border-blue-700 focus:outline-none focus:border-blue-500"
      >
        <option value="">Select User Type</option>
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
      </select>
      <h1 className="w-full font-semibold p-2 ">
        Don't have an account? <a href="/signup" className="hover:text-blue-700">Signup</a>
      </h1>
      <button
        className="w-full h-fit px-4 py-2 bg-yellow-600 hover:bg-green-600 rounded-md flex justify-center items-center "
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
