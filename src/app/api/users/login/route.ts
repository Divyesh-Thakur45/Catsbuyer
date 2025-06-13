import connectDB from "@/lib/db";
import userModel from "@/models/user.model";
import { compareSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    const isExist = await userModel.findOne({ email });
    if (!isExist) {
      return NextResponse.json({
        status: 400,
        message: "Email not found",
        success: false,
      });
    }

    const checkPassword = compareSync(password, isExist.password);
    if (!checkPassword) {
      return NextResponse.json({
        status: 400,
        message: "Password doesn't match",
        success: false,
      });
    }

    const token = jwt.sign({ _id: isExist._id }, "zxcvbnm", {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      status: 200,
      message: "Login successful",
      userID: isExist._id,
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("x-user", isExist._id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.log("Error in login:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error || "Unknown error",
      success: false,
    });
  }
}
