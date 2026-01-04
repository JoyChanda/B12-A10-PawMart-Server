const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users (Admin only - though we don't have middleware yet)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or Update user (called after Firebase registration/login)
router.post("/", async (req, res) => {
  try {
    const { name, email, photoURL, role } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.name = name || user.name;
      user.photoURL = photoURL || user.photoURL;
      // We don't update role here for security, unless explicitly requested
      if (role && ["admin", "user"].includes(role)) {
         // Optionally allow setting role if it's the first admin or a specific flag is set
         // For now, let's just keep it as is
      }
      await user.save();
      return res.json(user);
    }

    // Create new user
    user = new User({
      name,
      email,
      photoURL,
      role: role || "user"
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user role (Admin only)
router.patch("/role/:email", async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
