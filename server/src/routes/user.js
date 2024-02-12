import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getCart, getPurchases, getUserInfos } from "../controllers/userController.js";



const router = express.Router();

router.use(verifyToken);
router.route("/cart").get(getCart);
router.route("/purchases").get(getPurchases);
router.route("/info").get(getUserInfos);




export { router as user };
