const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commint: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
});

exports.Review = mongoose.model("Review", reviewSchema);
