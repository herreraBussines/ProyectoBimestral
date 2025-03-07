import express from "express";
import { check } from "express-validator";
import { addToCart, getCart, removeFromCart, clearCart } from "../Controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  [check("productId", "Product ID is required").not().isEmpty(), check("quantity", "Quantity must be at least 1").isInt({ min: 1 })],
  addToCart
);

router.get("/", authenticate, getCart);
router.delete("/:productId", authenticate, removeFromCart);
router.delete("/", authenticate, clearCart);

export default router;
