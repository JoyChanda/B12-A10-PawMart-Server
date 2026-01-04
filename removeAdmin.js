require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

const removeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const adminEmail = "admin@pawmart.com";
    
    // Completely remove the user from MongoDB
    const result = await User.findOneAndDelete({ email: adminEmail });

    if (result) {
      console.log(`✅ User ${adminEmail} has been removed from the database.`);
    } else {
      console.log(`ℹ️ User ${adminEmail} not found in the database.`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Operation failed:", err.message);
    process.exit(1);
  }
};

removeAdmin();
