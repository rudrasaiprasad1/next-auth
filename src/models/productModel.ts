import mongoose, { Schema, Document, Model } from "mongoose";
import { randomUUID } from "crypto";

/* ============================
   1️⃣ Product Interface
============================ */

export interface IProduct extends Document {
  productName: string;
  productId?: string;
  price: number;
  quantity: number;
  description: string;
  productImage: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide a product name"],
      unique: true,
      trim: true,
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
    },
  },
  {
    timestamps: true, // 👈 adds createdAt & updatedAt
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
