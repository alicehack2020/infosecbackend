import express from "express";

const router = express.Router();
 import {userRegister,userLogin,updatePassword,updateDetails,getuserDetails} from "../controllers/userController.js";
 import checkUserAuth from "../middlewares/auth-middleware.js";
router.post("/register", userRegister)
router.post("/login",userLogin)
router.put("/updatePassword",checkUserAuth,updatePassword)
router.put("/updateDetails",checkUserAuth,updateDetails)
router.get("/userDetails",checkUserAuth,getuserDetails)
export default router;
