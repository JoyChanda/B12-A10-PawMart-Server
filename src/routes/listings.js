const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

router.get("/", async (req, res) => {
  try {
    const { category, search, email, limit } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    if (email) filter.email = email;

    let query = Listing.find(filter).sort({ createdAt: -1 });
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const listings = await query;
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    // Validate required fields
    const { name, category, price, location, email } = req.body;
    if (!name || !category || price === undefined || !location || !email) {
      return res.status(400).json({
        error:
          "Missing required fields: name, category, price, location, and email are required",
      });
    }

    // Validate price is a number
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        error: "Price must be a non-negative number",
      });
    }

    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    // Validate price if provided
    if (req.body.price !== undefined) {
      if (typeof req.body.price !== "number" || req.body.price < 0) {
        return res.status(400).json({
          error: "Price must be a non-negative number",
        });
      }
    }

    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Listing not found" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json({ message: "Listing deleted successfully", listing });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
