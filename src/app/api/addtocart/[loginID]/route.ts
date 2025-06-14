import connectDB from "@/lib/db";
import addtocartModel from "@/models/addcart.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  // context: { params: { loginID: string } }
  { params }: { params: { loginID: string } }
) {
  try {
    await connectDB();

    const { loginID } = await params;
    // const loginID = await paramPromise.loginID;

    if (!loginID) {
      return NextResponse.json({
        status: 400,
        message: "Invalid login ID",
        success: false,
      });
    }

    const data = await addtocartModel.find({ loginID });

    if (data.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No data in cart",
        success: false,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Cart fetched successfully",
      cartData: data,
      success: true,
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { loginID: string } }
) {
  try {
    await connectDB();

    const { loginID } = await params;

    const item = await addtocartModel.findOne({ _id: loginID });

    if (!item) {
      return NextResponse.json({
        status: 404,
        message: "Cart item not found",
        success: false,
      });
    }

    const deleteData = await addtocartModel.findByIdAndDelete(loginID);

    return NextResponse.json({
      status: 200,
      message: "Deleted successfully",
      deleteData,
      success: true,
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}
