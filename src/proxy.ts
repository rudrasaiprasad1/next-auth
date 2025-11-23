import { NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  try {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup";

    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error) {
    console.error(error);
  }
};

export const config = {
  matcher: ["/", "/login", "/profile", "/signup"],
};
