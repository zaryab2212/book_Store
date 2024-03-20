const NewError = require("../utils/newError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Cart } = require("../Models/Cart");
const { find } = require("../Models/book");
const Book = require("../Models/book");

//Add to Cart

exports.addToCart = async (req, res, next) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book) {
      return next("book not found to add into cart", 400);
    }
    const userCart = await Cart.find({ userId: req.user });
    let bookExist = userCart.find(
      (crt) => crt.bookId.toString() === req.body.bookId.toString()
    );
    if (!bookExist) {
      const doc = await Cart.create({ ...req.body, userId: req.user });
      const result = await doc.save();
      const cart = await result.populate("bookId");
      res.status(200).json({
        success: true,
        message: "item added to cart succesfully ",
        cart,
      });
    } else {
      bookExist.Quantity += 1;
      const cart = await Cart.findByIdAndUpdate(bookExist._id, {
        bookId: bookExist.bookId,
        userId: req.user,
        Quantity: bookExist.Quantity,
      });
      res.status(200).json({
        success: true,
        message: "item added to cart succesfully ",
        cart,
      });
    }
  } catch (error) {
    next(new NewError("unable to add item into cart ", 400, error));
  }
};

//Get User Cart

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.user })
      .populate("bookId")
      .populate("userId");

    // if(!doc){
    //     next(new NewError("No cart found for this your, please make sure to add any data into cart",400))
    // }

    res.status(200).json({
      success: true,
      message: "item added to cart succesfully ",
      cart,
    });
  } catch (error) {
    next(new NewError("unable to fetch user cart Items ", 400, error));
  }
};

//Delete User Cart

exports.deleteFromCart = async (req, res, next) => {
  try {
    const doc = await Cart.findById(req.params.id);

    if (!doc) {
      next(new NewError("This cart not found", 400));
    }

    if (req.user.toString() !== doc.userId.toString()) {
      next(
        new NewError(
          "You are not authorized to delete this cart item or try wih correct credentils",
          400
        )
      );
    }

    const cart = await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "item deleted form cart succesfully ",
      cart,
    });
  } catch (error) {
    next(new NewError("unable to delete data form the cart ", 400, error));
  }
};

//Update User Cart

exports.updateCart = async (req, res, next) => {
  try {
    const doc = await Cart.findById(req.params.id);

    if (!doc) {
      next(new NewError("This cart not found", 400));
    }

    if (req.user.toString() !== doc.userId.toString()) {
      next(
        new NewError(
          "You are not authorized to update this cart item or try wih correct credentils",
          400
        )
      );
    }

    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("bookId");

    res.status(200).json({
      success: true,
      message: "item from cart updated succesfully ",
      cart,
    });
  } catch (error) {
    next(new NewError("unable to update data form the cart ", 400, error));
  }
};
