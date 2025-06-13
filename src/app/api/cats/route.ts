import connectDB from "@/lib/db";
import catsModel from "@/models/cat.model";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET: Fetch all cats
export async function GET() {
  try {
    await connectDB();

    const catsData = await catsModel.find();

    return NextResponse.json({
      status: 200,
      message: "Fetched successfully",
      catsData,
      success: true,
    });
  } catch (error) {
    console.log("Error in fetch data:", error);
    return NextResponse.json(
      { status: 500, message: "Error fetching data", error, success: false },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new cat entry
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    let imagePath: string | null = null;
    if (file) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const filePath = `./public/uploads/${uniqueFileName}`;
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${file.name}`;
    }

    const data = await catsModel.create({ image: imagePath, name, price });

    return NextResponse.json({
      status: 201,
      message: "Created successfully",
      catsData: data,
      success: true,
    });
  } catch (error) {
    console.log("Error in create data:", error);
    return NextResponse.json(
      { status: 500, message: "Error creating data", error, success: false },
      { status: 500 }
    );
  }
}
