import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/src/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "User Doesn't Exist" },
        { status: 404 }
      );
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json({
        error: `Invalid Password `,
        status: 401,
      });
    }

    if (user.isVerified === false) {
      return NextResponse.json(
        { error: "Email Not Verified. Please Verify Your Email!" },
        { status: 403 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.userName,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: `Login Successfully ✅`,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.name}: ${error.message}`);
      return NextResponse.json(
        {
          error: error.message || "Internal Server Error",
          success: false,
        },
        { status: 500 }
      );
    }
  }
};
