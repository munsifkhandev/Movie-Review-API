const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4455;

app.get("/", (req, res) => {
  res.send("Helloo");
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
