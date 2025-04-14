const mongoose = require("mongoose");
module.exports.connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/prodify");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);   
  }
}