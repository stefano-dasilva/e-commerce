import { ProductModel } from "../models/product.js";
import { UserModel } from "../models/user.js";
import { CategoryModel } from "../models/category.js";
import { PurchaseModel } from "../models/purchase.js";

const buyProduct = async (req, res) => {
  const { product_ID,creditcard,address,city, quantity } = req.body;
  const user_ID = req.id;

  const user = await UserModel.findById(user_ID);
  if (!user) {
    return res.status(404).json({ message: "user doesn't exists" });
  }
  if (!product_ID) {
    return res.status(404).json({ message: "product_id doesn't exists" });
  }

  if (!quantity || quantity < 1) {
    return res.status(404).json({ message: "quantity doesn't exists or  < 1" });
  }

  try {
    const product = await ProductModel.findById(product_ID);

    if (!product) {
      return res.status(404).json({ message: "product doesn't exists" });
    }

    

    if (quantity > product.availability) {
      return res.status(404).json({
        message: "you can't purchase more items than those available",
      });
    }

    console.log("sono prima");

    const newPurchase = new PurchaseModel({
      product: product_ID,
      date: new Date(),
    });

    await newPurchase.save();

    user.purchases.push(newPurchase);
    console.log("sono DOPO");
    user.cart.pull(product_ID);

    if(creditcard !== ""){
      user.creditcard = creditcard
    }
    if(address !== "" && city !== ""){
      user.address = address
      user.city = city
    }
    await user.save();
    product.availability = product.availability - quantity;
    product.purchased = product.purchased + 1;
    await product.save();
    return res.status(201).json({ message: "product added to purchases" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const addToCart = async (req, res) => {
  const { product_ID, quantity } = req.body;
  const user_ID = req.id;
  console.log("userid : " + user_ID);
  console.log("quantity : " + quantity);
  console.log("product_ID : " + product_ID);

  const quantityInt = parseInt(quantity, 10);

  const user = await UserModel.findById(user_ID);
  if (!user) {
    return res.status(404).json({ message: "user doesn't exists" });
  }
  if (!product_ID) {
    return res.status(404).json({ message: "product_id doesn't exists" });
  }

  if (!quantityInt || quantityInt < 1) {
    return res.status(404).json({ message: "quantity doesn't exists or  < 1" });
  }

  try {
    const product = await ProductModel.findById(product_ID);

    if (!product) {
      return res.status(404).json({ message: "product doesn't exists" });
    }

    console.log("quantity : " + quantityInt);
    console.log("product_availability : " + product.availability);
    console.log("product_price : " + product.price);

    if (quantityInt > product.availability) {
      return res.status(404).json({
        message: "you can't purchase more items than those available",
      });
    } else {
      console.log("ramo else");
      console.log("Before pushing to cart");
      user.cart.push(product_ID);
      console.log("After pushing to cart");
      await user.save();
      return res.status(200).json({ message: "product added to cart" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category_ID } = req.query;

  try {
    const products = await CategoryModel.findById(category_ID)
      .populate({
        path: "products",
        select: "name availability price image description",
      })
      .exec();

    if (!products) {
      return res.status(404).json({ message: "product not found" });
    }

    return res.status(201).json({ content: products });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "internal error getProductsByCategory" });
  }
};

const HottestProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .sort({ purchased: -1 })
      .limit(8)
      .select("name image price description");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ content: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error Hottest" });
  }
};
const pullFromCart = async (req, res) => {
  const { product_ID } = req.body;

  const user_ID = req.id;
  try {
    const user = await UserModel.findById(user_ID);
    if (!user) {
      return res.status(404).json({ message: "user doesn't exists" });
    }
    if (!product_ID) {
      return res.status(404).json({ message: "product_id doesn't exists" });
    }

    user.cart.pull(product_ID);
    await user.save();

    return res.status(200).json({ message: "pulled" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error pullFromCart" });
  }
};

export {
  buyProduct,
  addToCart,
  getProductsByCategory,
  HottestProducts,
  pullFromCart,
};
