const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4455;

app.use("/api/v1/", userRoutes);

app.get("/", (req, res) => {
  res.send("Helloo from Server Test Route...");
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
