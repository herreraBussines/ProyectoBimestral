import Invoice from "../models/invoice.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import PDFDocument from "pdfkit";

// Process purchase
export const processPurchase = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    let total = 0;
    for (const item of cart.items) {
      total += item.product.price * item.quantity;
    }

    const invoice = new Invoice({
      user: req.user.id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
    });

    await invoice.save();
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json({ message: "Purchase completed", invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).populate("items.product", "name price");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate invoice PDF
export const generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("user").populate("items.product");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${invoice._id}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Invoice ID: ${invoice._id}`);
    doc.text(`Customer: ${invoice.user.name}`);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    invoice.items.forEach((item) => {
      doc.text(`Product: ${item.product.name} - Quantity: ${item.quantity} - Price: $${item.price}`);
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total: $${invoice.total}`, { align: "right" });
    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
