import User from "../../models/userModel.js";
import userModelValidator from "../../zodValidator/userModelValidator.js";
import bcrypt from "bcrypt";

async function signupUser(req, res) {
  try {
    const data = req.body;
    console.log(data);

    const { name, email, password, userType, phone } = userModelValidator(
      data,
      true
    );

    if (!name && !email && !password && !userType && !phone) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const findDuplicate = await User.findOne({ email });
    if (findDuplicate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      phone,
    });
    await user.save();

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
}

export default signupUser;
