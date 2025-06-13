import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_TOKEN!;
const verifySid = process.env.TWILIO_VERIFYSID;

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNum } = body;
    console.log(phoneNum);

    if (!phoneNum) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    const verification = await client.verify.v2
      .services(verifySid as string)
      .verifications.create({ to: `+91${phoneNum}`, channel: "sms" });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      sid: verification.sid,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP",
        error: error,
      },
      { status: 500 }
    );
  }
}
