import { dbConnect } from "@/src/db/config";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export const GET = async (request: NextRequest) => {
  try {
    const UserId = await getDataFromToken(request);
    const user = await User.findOne({ _id: UserId }).select("-password");

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
      });
    }
  }
};
