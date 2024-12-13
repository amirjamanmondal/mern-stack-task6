import express from "express";
import signupUser from "../controllers/user/signupUser.js";
import loginUser from "../controllers/user/loginUser.js";
import verifyToken from "../middleware/verifyToken.js";
import logoutUser from "../controllers/user/logoutUser.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "welcome to home page", user });
});
router.get("/logout", verifyToken, logoutUser);

export default router;
