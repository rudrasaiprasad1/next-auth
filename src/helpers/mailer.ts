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
      subject:
        emailType === EmailType.VERIFY
          ? "Verify your Email"
          : "Reset Your Password",
      html: `
<div style="font-family: Arial, sans-serif; background:#f5f7fa; padding:30px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:white; border-radius:8px; border:1px solid #e5e7eb;">
    <tr>
      <td style="padding:30px;">

        <h2 style="margin:0 0 15px; font-size:22px; color:#111827;">
          ${EmailType.VERIFY ? "Verify Your Email" : "Reset Your Password"}
        </h2>

        <p style="font-size:15px; color:#374151; line-height:1.6;">
          Click the button below to 
          ${
            EmailType.VERIFY
              ? "verify your email address"
              : "reset your password"
          }:
        </p>

        <div style="margin:25px 0;  display: flex; justify-content: center;">
          <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
            style="background:#4F46E5; padding:14px 28px; color:white; text-decoration:none; border-radius:6px; display:inline-block; font-weight:bold; font-size:15px;">
            ${EmailType.VERIFY ? "Verify Email" : "Reset Password"}
          </a>
        </div>

        <p style="font-size:14px; color:#374151; line-height:1.6;">
          If the button doesn’t work, use the link below:
        </p>
        <p style="font-size:13px; color:#6b7280; margin-top:25px;">
          If you didn’t request this, you can safely ignore this email.
        </p>

      </td>
    </tr>
  </table>
</div>
`,
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
