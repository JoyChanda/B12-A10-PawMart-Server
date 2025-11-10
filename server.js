const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (env: ${NODE_ENV})`);
});
