import express from "express";
import signupUser from "../controllers/user/signupUser.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import logoutUser from "../controllers/user/logoutUser.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signupUser);

// user login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      // Handle failure message
      return res.status(401).json({ message: info.message || "Authentication failed" });
    }
    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Login failed" });
      }
      // Send success message
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType,
        },
      });
    });
  })(req, res, next);
});



router.get("/", isAuthenticated, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "welcome to home page", user });
});
router.get("/logout", isAuthenticated, logoutUser);

export default router;
