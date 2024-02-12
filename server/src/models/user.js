import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },

  creditcard : {
    type : String,
    required : false
  },
  address : {
    type : String,
    required : false
  },
  city : {
    type : String,
    required : false
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase",
    },
  ],

});

export const UserModel = mongoose.model("user", UserSchema)