import { randomUUID } from "crypto";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "please provide a Product Name"],
    unique: true,
  },
  productId: {
    type: randomUUID,
    autoincre: [true, "please provide a Email"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "please provide a Price"],
  },
  quantity: {
    type: Number,
    required: [true, "please provide a Quantity"],
    default: 1,
  },
  description: {
    type: String,
    nullable: true,
  },
  productImage: {
    type: String,
    nullable: true,
  },
  userId: {
    type: String,
    nullable: true,
  },
});

const Product =
  mongoose.models.users || mongoose.model("products", productSchema);

export default Product;
