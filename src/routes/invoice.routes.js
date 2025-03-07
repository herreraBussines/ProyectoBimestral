import express from "express";
import { processPurchase, getInvoices, generateInvoicePDF } from "../Controllers/invoice.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, processPurchase);
router.get("/", authenticate, getInvoices);
router.get("/:id/pdf", authenticate, generateInvoicePDF);

export default router;
