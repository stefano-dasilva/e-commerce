import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { buyProduct, getProductsByCategory } from "../controllers/productController.js";
import { addToCart } from "../controllers/productController.js";
import { HottestProducts } from "../controllers/productController.js";
import { pullFromCart } from "../controllers/productController.js";

const router = express.Router();

router.use(verifyToken);
router.route("/addtocart").post(addToCart);
router.route("/buy").post(buyProduct);
router.route("/getproducts").get(getProductsByCategory);
router.route("/hottest").get(HottestProducts);
router.route("/pullfromcart").post(pullFromCart);

export { router as product };
