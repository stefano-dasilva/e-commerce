import { CategoryModel } from "../models/category.js";

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}, "name ");

    return res.status(200).json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

export {getCategories}