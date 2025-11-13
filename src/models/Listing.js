const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: String,
    image: String,
    email: { type: String, required: true },
    date: String,
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Listing", ListingSchema);
