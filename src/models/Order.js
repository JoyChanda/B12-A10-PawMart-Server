const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    productName: { type: String, required: true },
    buyerName: String,
    email: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    additionalNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
