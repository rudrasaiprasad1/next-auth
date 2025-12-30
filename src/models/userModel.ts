import mongoose, { Schema, Document, Model } from "mongoose";

/* ============================
   1️⃣ User Interface
============================ */

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;

  // Profile
  fullName?: string;
  avatar?: string;
  phone?: string;

  // Auth & Roles
  role: "USER" | "ADMIN" | "MODERATOR";
  isVerified: boolean;
  isActive: boolean;

  // Tokens
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;

  // Metadata
  lastLogin?: Date;
  loginCount: number;

  createdAt: Date;
  updatedAt: Date;
}

/* ============================
   2️⃣ Schema Definition
============================ */

const UserSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false, // 👈 hides password in queries
    },

    // Profile
    fullName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },

    // Auth & Status
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MODERATOR"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Tokens
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

    // Metadata
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // 👈 adds createdAt & updatedAt
  }
);

/* ============================
   3️⃣ Model Export
============================ */

const User: Model<IUser> =
  mongoose.models.User || mongoose.model < IUser > ("User", UserSchema);

export default User;
