import addtocartModel from "@/models/addcart.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    const id = request.cookies.get("x-user")?.value;

    if (!token || !id) {
      return NextResponse.json({
        status: 400,
        message: "Please login or signup first",
        success: false,
      });
    }
    const body = await request.json();
    const { image, name, price } = body;
    // return NextResponse.json({ image, name, price, id });
    const data = await addtocartModel.create({
      image,
      name,
      price,
      loginID: id,
    });
    return NextResponse.json({
      status: 200,
      message: "cat add successfully",
      addData: data,
      success: true,
    });
  } catch (error) {
    console.log("Error in fetch one data: ", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}
