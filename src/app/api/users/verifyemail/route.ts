import { dbConnect } from "@/src/db/config";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
dbConnect();
export const POST = async (request: NextRequest) => {
  try {
    const RequesBody = await request.json();
    const { token } = RequesBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Token",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    user.save();

    return NextResponse.json(
      {
        message: "Email Verified Successfully ",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
};
