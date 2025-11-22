import { NextResponse } from "next/server";

export function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully !!",
      scuccess: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}
