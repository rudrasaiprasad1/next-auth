import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/userModel";
import { EmailType } from "./types";
import SMTPTransport from "nodemailer/lib/smtp-transport";

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
    if (emailType === EmailType.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === EmailType.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }
    const transporter = nodemailer.createTransport({
      service: process.env.GOOGLE_APP_SERVICE,
      secure: true,
      port: process.env.GOOGLE_APP_PORT,
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: "saiprasadrudra9@gmail.com",
      to: email,
      subject: EmailType.VERIFY ? "Verify your Email" : "Reset Your Password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        EmailType.VERIFY ? "Verify your Email" : "Reset Your Password"
      }</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(mailResponse);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`${error.name} : ${error.message}`);
    }
  }
};
