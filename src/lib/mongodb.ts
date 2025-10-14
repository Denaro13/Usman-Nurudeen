// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     "⚠️ Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let isConnected = false; // Track connection status

// export const connectDB = async () => {
//   //   console.log("MONGODB_URI", MONGODB_URI);
//   if (isConnected) {
//     console.log("✅ MongoDB already connected");
//     return;
//   }

//   try {
//     const db = await mongoose.connect(MONGODB_URI);
//     isConnected = !!db.connections[0].readyState;
//     console.log("🚀 MongoDB connected");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed", error);
//     throw new Error("MongoDB connection error");
//   }
// };

import mongoose from "mongoose";

const cached: { conn?: typeof mongoose; promise?: Promise<typeof mongoose> } =
  {};

const mongo_uri = process.env.MONGODB_URI;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!mongo_uri) throw new Error("Please define a connection string!");

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongo_uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }

  return cached.conn;
}
