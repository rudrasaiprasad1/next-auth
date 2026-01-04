import { dbConnect } from "@/src/db/config";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import { sendEmail } from "@/src/helpers/mailer";
import { EmailType } from "@/src/helpers/types";

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: `User Not Exists '${email}'`,
        status: 400,
      });
    }

    if (user) {
      await sendEmail({
        email: email,
        emailType: EmailType.RESET,
        userId: `${user._id}`,
      });
    }

    return NextResponse.json({
      message: `Password Reset Link Sent to your verified Email.`,
      success: true,
      user,
    });
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
