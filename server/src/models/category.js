import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  products : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  image: {
    required: true,
    type: Buffer,
  },
});

export const CategoryModel = mongoose.model("category", CategorySchema);
