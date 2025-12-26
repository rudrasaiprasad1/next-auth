import { dbConnect } from "@/src/db/config";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import User from "@/src/models/userModel";
import Product from "@/src/models/productModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const UserId = await getDataFromToken(request);

    const {};

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
