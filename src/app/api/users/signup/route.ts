import { dbConnect } from "@/src/db/config";

import { NextResponse, NextRequest } from "next/server";

import bcrypt from "bcryptjs";
import { sendEmail } from "@/src/helpers/mailer";
import { EmailType } from "@/src/helpers/types";
import User from "@/src/models/userModel";

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        error: `User Already Exists '${email}'`,
        status: 400,
      });
    }

    //hash passowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    await sendEmail({
      email: email,
      emailType: EmailType.VERIFY,
      userId: `${savedUser._id}`,
    });

    return NextResponse.json({
      message: `User Register Successfully ✅`,
      success: true,
      savedUser,
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
