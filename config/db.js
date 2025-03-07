import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/user.model.js";
import argon2 from "argon2";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");

    const adminExists = await User.findOne({ role: "ADMIN" });

    if (!adminExists) {
      const hashedPassword = await argon2.hash("Admin123"); 

      const adminUser = new User({
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
      });

      await adminUser.save();
      console.log("Default ADMIN created: admin@example.com / Admin123");
    }
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
