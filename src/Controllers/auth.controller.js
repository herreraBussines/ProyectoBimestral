import User from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "The email is already registered" });

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: "CLIENT",
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Incorrect credentials" });

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};