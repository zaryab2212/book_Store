const mongoose = require("mongoose");

exports.conection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Data Base connected");
  } catch (error) {
    console.log("Db connection Error", error);
  }
};
