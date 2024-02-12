import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description : {
    required : true,
    type : String
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  price : {
    required : true,
    type: Number,
  },
  image: {
    required: false,
    type : Buffer
  },
  availability : {
    required : true,
    type : Number,
  },
  purchased : {
    type : Number,
  }
});

export const ProductModel = mongoose.model("product", ProductSchema)