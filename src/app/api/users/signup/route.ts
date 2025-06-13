import connectDB from "@/lib/db";
import userModel from "@/models/user.model";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_TOKEN!;
const verifySid = process.env.TWILIO_VERIFYSID;

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, phoneNum, otp } = body;

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return NextResponse.json({
        status: 409,
        message: "Email already exists",
        success: false,
      });
    }

    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);

    const verification = await client.verify.v2
      .services(verifySid as string)
      .verificationChecks.create({ to: `+91${phoneNum}`, code: otp });

    console.log("OTP status:", verification.status);

    if (verification.status !== "approved") {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired OTP",
        status: 401,
      });
    }
    const data = await userModel.create({ email, password: hashPassword });

    return NextResponse.json({
      status: 201,
      message: "Signup successful",
      signupData: data,
      success: true,
    });
  } catch (error) {
    console.log("Error in signup:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error || "Unknown error",
      success: false,
    });
  }
}
