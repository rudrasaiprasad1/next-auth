import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the auth cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Logout failed : ${error}` },
      { status: 500 }
    );
  }
};
