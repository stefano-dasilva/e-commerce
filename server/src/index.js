import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { auth } from "./routes/auth.js";
import { product } from "./routes/product.js";
import { categories } from "./routes/categories.js";
import { user } from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.use("/auth", auth);
app.use("/product", product);
app.use("/categories", categories);
app.use("/user", user);

mongoose.connect(process.env.MONGO_URL);
app.listen(3001, () => console.log("listening..."));
