import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getCategories } from "../controllers/categoriesController.js";

const router = express.Router();

router.use(verifyToken);
router.route("/get").get(getCategories);

export { router as categories };
