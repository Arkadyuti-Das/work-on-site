import express from "express";
import { checkOldPassword, forgotPassword, getData, logIn, logOut, resetPassword, verifyToken } from "../controllers/controllers";

const router=express.Router();
router.post("/signup", getData);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/verify-token", verifyToken);

router.post("/forgot-password", forgotPassword);
router.post("/check-oldpassword", checkOldPassword);
router.post("/reset-password", resetPassword);

export default router;