import express from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../Controllers/category.controller.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, isAdmin, createCategory);
router.get("/", authenticate, getCategories);
router.put("/:id", authenticate, isAdmin, updateCategory);
router.delete("/:id", authenticate, isAdmin, deleteCategory);

export default router;
