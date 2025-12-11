import { dbConnect } from "@/src/db/config";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
dbConnect();
export const POST = async (request: NextRequest) => {
  try {
    const RequesBody = await request.json();
    const { token, password } = RequesBody;
    console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
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

    if (user.isVerified === false) {
      return NextResponse.json(
        {
          error: "Please Verify the Email then set the password",
        },
        { status: 400 }
      );
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.save();

    return NextResponse.json(
      {
        message: "Password Changed Successfully ",
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
