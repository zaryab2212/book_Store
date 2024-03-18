const mongoose = require("mongoose");

exports.conection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/book_store");
    console.log("Data Base connected");
  } catch (error) {
    console.log("Db connection Error", error);
  }
};
