import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log("hhhhh");
  const currentPath = request.nextUrl.pathname;
  const publicPath = currentPath === "/login" || currentPath === "/signup";
  const token: string | undefined = request.cookies.get("token")?.value;
  if (!token && !publicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && publicPath) {
    return NextResponse.redirect(new URL("/cart", request.url));
  }

  // if (token) {
  //   try {
  //     const SECRET_KEY = new TextEncoder().encode("zxcvbnm");
  //     const { payload } = await jwtVerify(token as string, SECRET_KEY);
  //     const response = NextResponse.next();
  //     response.cookies.set("x-user", JSON.stringify(payload._id));
  //     return response;
  //   } catch (error) {
  //     console.log("JWT Verify Error:", error);
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/cart"],
};
