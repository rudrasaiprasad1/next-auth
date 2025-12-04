import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/userModel";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken });
    }
    const transporter = nodemailer.createTransport({
      service: process.env.GOOGLE_APP_SERVICE,
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`${error.name} : ${error.message}`);
    }
  }
};
