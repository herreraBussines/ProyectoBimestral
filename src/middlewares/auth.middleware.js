import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    if (req.userRole !== "ADMIN") {
        return res.status(403).json({ message: "Admin role required" });
    }
    next();
};