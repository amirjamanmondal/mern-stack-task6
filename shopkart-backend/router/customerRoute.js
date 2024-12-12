import express from "express";
import signupUser from "../controllers/user/signupUser.js";
import loginUser from "../controllers/user/loginUser.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get('/',verifyToken,(req,res)=>{
    res.status(200).json({message:"welcome to home page"})
})
export default router;