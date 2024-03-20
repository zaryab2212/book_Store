const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title  is required"],
    },
    author: {
      type: String,
      required: [true, "Title  is required"],
    },
    Cat: {
      type: String,
      enum: ["NEW_ARRIVAL", "ON_SALE", "BEST_SELLING", "TOP_RATED"],
      default: "NEW_ARRIVAL",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 0],
      default: 0,
    },
    sale: {
      type: Number,
      default: 0,
    },
    OldPrice: {
      type: Number,
    },
    genre: {
      type: String,
      required: [true, "genre  is required"],
    },

    description: {
      type: String,
      required: [true, "Title  is required"],
    },
    price: {
      type: Number,
      required: [true, "Title  is required"],
    },
    publicationDate: {
      type: String,
      required: [true, "Title  is required"],
    },

    stockQuantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    file: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    inStock: { type: Number },
    pages: { type: Number },
    Description: { type: String },
    ReviewId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
