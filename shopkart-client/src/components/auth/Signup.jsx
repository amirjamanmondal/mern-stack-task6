import React, { useReducer } from "react";
import axios from "axios";
import TextFeild from "../common/TextFeild";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  userType: "",
  phone: 1000000000,
  address: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_USER_TYPE":
      return { ...state, userType: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  // Destructure state variables
  const { name, email, password, userType, phone, address } = state;

  async function handleSignup() {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/signup",
        { name, email, password, userType, phone, address },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      console.log(data.user);

      // localStorage.setItem("user", JSON.stringify(data.user.email));
      toast(data.message);
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="w-1/3 h-fit mx-0 flex flex-col gap-8 px-12 py-8 bg-blue-300 shadow-lg border rounded-md my-8">
      <Toaster />
      <h1 className="w-full flex justify-center text-3xl font-semibold text-blue-700">
        Signup
      </h1>
      <TextFeild
        type={"text"}
        name={"name"}
        placeholder={"Name"}
        value={name}
        id={"lastName"}
        setValue={(value) => dispatch({ type: "SET_NAME", payload: value })}
      />

      <TextFeild
        type={"email"}
        name={"email"}
        placeholder={"Email"}
        id={"email"}
        value={email}
        setValue={(value) => dispatch({ type: "SET_EMAIL", payload: value })}
      />

      <TextFeild
        type={"password"}
        name={"password"}
        placeholder={"Password"}
        id={"password"}
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

      <TextFeild
        type={"number"}
        name={"phone"}
        placeholder={"Phone"}
        id={"phone"}
        value={phone}
        setValue={(value) =>
          dispatch({ type: "SET_PHONE", payload: parseInt(value) })
        }
      />
      <TextFeild
        type={"text"}
        name={"address"}
        placeholder={"address"}
        id={"address"}
        value={address}
        setValue={(value) => dispatch({ type: "SET_ADDRESS", payload: value })}
      />
      <h1 className="w-full font-semibold p-2 ">
        Already have an account?{" "}
        <a href="/login" className="hover:text-blue-700">
          login
        </a>
      </h1>

      <button
        className="w-full h-fit px-4 py-2 bg-yellow-600 hover:bg-green-600 rounded-md flex justify-center items-center "
        onClick={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
