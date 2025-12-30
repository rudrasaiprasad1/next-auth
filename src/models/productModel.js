import mongoose from "mongoose";
import { randomUUID } from "crypto";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide a product name"],
      unique: true,
    },

    productId: {
      type: String,
      unique: true,
      default: () => randomUUID(),
    },

    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    description: {
      type: String,
      default: null,
    },

    productImage: {
      type: String,
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId, // 👈 better
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default Product;
