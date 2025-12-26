import { dbConnect } from "@/src/db/config";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import Product from "@/src/models/productModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export const POST = async (request: NextRequest) => {
  try {
    const UserId = await getDataFromToken(request);

    const {
      productName,
      productId,
      price,
      quantity,
      description,
      productImage,
    } = await request.json();

    if (!productName || !price) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      productName,
      productId,
      price,
      quantity,
      description,
      productImage,
      userId: UserId,
    });

    return NextResponse.json(
      {
        message: "Product Created Successfully !!",
        data: product,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
      });
    }
  }
};
