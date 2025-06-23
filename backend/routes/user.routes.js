import express from "express";
import { logout, register, login,updateProfile } from "../controllers/user.controller.js";
const router= express.Router();
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js";

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);
export default router;