import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "CLIENT"], default: "CLIENT" }
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await argon2.hash(this.password);
   next(); 
});

userSchema.methods.comparePassword = async function (password) {
    return await argon2.verify(this.password, password);
};

export default mongoose.model("User", userSchema);