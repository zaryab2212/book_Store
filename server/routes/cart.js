const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  deleteFromCart,
} = require("../Controllers/cart");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get", getCart);
router.delete("/:id", deleteFromCart);
router.patch("/:id", updateCart);

module.exports = router;
