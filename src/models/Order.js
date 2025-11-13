const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    productName: String,
    buyerName: String,
    email: String,
    quantity: Number,
    price: Number,
    address: String,
    phone: String,
    date: String,
    additionalNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
