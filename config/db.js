const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected Successfully..");
  } catch (error) {
    console.log(error);
    console.error(error);
    console.log("Error Connecting DB..", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
