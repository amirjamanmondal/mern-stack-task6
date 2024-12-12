import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim:true,
    },
    userType: {
      type: String,
      required: true,
      enum: ["admin", "customer", "seller", "deliveryBoy"],
      default: "customer",
    },
    phone: {
      type: Number,
      required: true,
      trim:true,
    },
    address: {
      type: String,
      required: true,
      default: "Not provided",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

// name, email, password, userType, phone, address 
