import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const userType = req.body.userType;
          console.log(userType);

          const user = await User.findOne({ email, userType });

          if (!user) {
            return done(null, false, {
              message: "User not found or Invalid Email",
            });
          }

          if (!(await bcrypt.compare(password, user.password || ""))) {
            return done(null, false, { message: "Password is Incorrect" });
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error, false, { message: "Internal server error" });
        }
      }
    )
  );

  // Passport Serialize and Deserialize
  passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (error) {
      console.error(error);
      return done(error, false, {
        message: "Error during serialization",
      });
    }
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false, { message: "User not Exist" });
      }
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error, false, {
        message: "Error during deserialization",
      });
    }
  });
};

export default initializePassport;
