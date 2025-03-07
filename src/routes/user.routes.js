import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser, changeUserRole } from "../Controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authenticate, isAdmin, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);
router.put("/:id/role", authenticate, isAdmin, changeUserRole);

export default router;
