// /app/api/logout/route.ts
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const response = NextResponse.json({
      status: 200,
      message: "Logout successfully 👍",
      success: true,
    });

    // Delete cookies by expiring them
    response.cookies.set("token", "", { path: "/", maxAge: 0 });
    response.cookies.set("x-user", "", { path: "/", maxAge: 0 });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong!",
      success: false,
    });
  }
}
