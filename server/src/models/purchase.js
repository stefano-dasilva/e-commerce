import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

export const PurchaseModel = mongoose.model("purchase", PurchaseSchema);
