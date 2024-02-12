import express from "express";
import { login } from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";
import { register } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.use(verifyToken)
router.route("/logout").post(logout)

export {router as auth}