import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./router/customerRoute.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser({
  secret: process.env.COOKIE_SECRET || "your_secret_key",
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 4 * 60 * 60 * 1000 },
  })
);

app.use("/user", router);

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(function (res) {
    console.log(`database connected to ${res.connection.host}`);
  })
  .catch(function (err) {
    console.log(err.message);
  });
