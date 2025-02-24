import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import User from "./src/models/user.model.js";
import argon2 from "argon2";
import "dotenv/config.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(async () => {
    await createAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const createAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN" });

        if (adminExists) {
            console.log("Admin already exists");
        } else {
            const hashedPassword = await argon2.hash("Admin123");
            await User.create({
                username: "admin",
                email: "admin@example.com",
                password: hashedPassword,
                role: "ADMIN"
            });
            console.log("Admin created successfully");
        }
    } catch (error) {
        console.error("Error creating admin:", error);
    }
};