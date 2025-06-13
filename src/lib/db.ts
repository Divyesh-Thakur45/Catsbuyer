import mongoose, { Mongoose } from "mongoose";
import "dotenv/config";

// Replace this with your actual environment variable or hardcoded string if needed
const DB_URL: string =
  "mongodb+srv://divyeshthakur370:gYOojFBomm9DHmYK@cluster0.vxnybhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!DB_URL) throw new Error("Connection string not found");

// ✅ Properly extend NodeJS.Global
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      };
    }
  }
}

// ✅ Type-safe global variable initialization
const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

const cached = globalWithMongoose.mongoose;

export async function connectDB(): Promise<Mongoose | undefined> {
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
      cached.promise = mongoose.connect(DB_URL, {
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
