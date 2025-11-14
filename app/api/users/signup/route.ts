import { dbConnect } from "@/db/config";
import User from "@/models/userModel";

import { NextResponse, NextRequest } from "next/server";

import bcrypt from "bcryptjs";

dbConnect();

export const POST = async (request: NextRequest, rsp: NextResponse) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody); //hitest chaudary downloaded video nextjs fullstack timestamp 23:03
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.name}: ${error.message}`);
    }
  }
};
