import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();

await connectDB();

try {
  const newUser = await User.create({
    name: "Test User",
    email: "testuser@example.com",
    password: "123456",
    role: "tourist",
  });

  console.log("✅ User Created:", newUser);
} catch (error) {
  console.error("❌ Error creating user:", error.message);
}

mongoose.connection.close();
