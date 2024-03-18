const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  total: Number,
  Quantity: { type: Number, require: true, min: 1 },
  otherInstructions: {
    type: String,
  },
});

exports.Cart = mongoose.model("Cart", CartSchema);
