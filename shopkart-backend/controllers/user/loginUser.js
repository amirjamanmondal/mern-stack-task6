import User from "../../models/userModel.js";
import userModelValidator from "../../zodValidator/userModelValidator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginUser(req, res) {
  try {
    const { email, password, userType } = userModelValidator(req.body, false);

    if (!email && !password && !userType)
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });

    const user = await User.findOne({ email, userType });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!email || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    const authToken = `Bearer ${token}`
    res.setHeader("Authorization", `Bearer ${token}`);
    res
      .status(200)
      .json({ message: "User logged in successfully", token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error in Login ${error}` });
    console.log(error);
  }
}

export default loginUser;
