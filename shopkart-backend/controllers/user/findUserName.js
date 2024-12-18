import User from "../../models/userModel.js";

async function findUserName(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("name");
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(200).json({ message: "Username is available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

export default findUserName;