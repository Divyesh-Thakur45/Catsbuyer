import catsModel from "@/models/cat.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const isFind = await catsModel.findOne({ _id: id });

    if (!isFind) {
      return NextResponse.json({
        status: 404,
        message: "No data found",
        success: false,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Fetch one data successfully",
      catsData: isFind,
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
