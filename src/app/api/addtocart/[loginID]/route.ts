import connectDB from "@/lib/db";
import addtocartModel from "@/models/addcart.model";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    loginID: string;
  };
};

// ✅ GET: Cart data fetch by loginID
export async function GET(req: NextRequest, context: Context) {
  try {
    await connectDB();

    const { loginID } = context.params;

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

// ✅ DELETE: Delete cart item by _id
export async function DELETE(req: NextRequest, context: Context) {
  try {
    await connectDB();

    const { loginID } = context.params;

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
