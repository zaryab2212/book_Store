const express = require("express");
const {
  addBook,
  GetAllBooks,
  GetSingleBook,
  deleteBook,
  GetOnSaleBooks,
  updateBook,
  getBestCollection,
  getAuthors,

  getOnSale,
  getNewArrival,
  getTopRated,
  getAllBooks,
  getBestSellingbk,
  getGenre,
} = require("../Controllers/book");
const { authorized } = require("../Middlwares/authorized");
const { upload } = require("../Middlwares/multer");

const router = express.Router();

router.get("/genre", getGenre);
router.get("/authors", getAuthors);
router.post("/add", authorized, upload, addBook);
router.get("/", getAllBooks);
router.get("/best-collection", getBestCollection);
router.get("/top-rated", getTopRated);
router.get("/best-selling", getBestSellingbk);
router.get("/on-sale", getOnSale);
router.get("/new-arrival", getNewArrival);
router.get("/:id", GetSingleBook);
router.delete("/:id", authorized, deleteBook);
router.patch("/:id", authorized, updateBook);

module.exports = router;
