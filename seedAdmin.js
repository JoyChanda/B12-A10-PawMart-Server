require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const adminEmail = "admin@pawmart.com";
    const adminUser = {
      name: "PawMart Admin",
      email: adminEmail,
      role: "admin",
      photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      status: "active"
    };

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      existingUser.role = "admin";
      await existingUser.save();
      console.log("Admin role updated for existing user.");
    } else {
      await User.create(adminUser);
      console.log("Admin user created successfully.");
    }

    console.log("Admin seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedAdmin();
