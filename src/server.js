require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Fix CORS properly
app.use(
  cors({
    origin: "*", // your frontend ports
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB err:", err));

// ✅ Routes
const listingsRoute = require("./routes/listings");
const ordersRoute = require("./routes/orders");

app.use("/api/listings", listingsRoute);
app.use("/api/orders", ordersRoute);

app.get("/", (req, res) => res.send({ message: "PawMart API is running!" }));

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
