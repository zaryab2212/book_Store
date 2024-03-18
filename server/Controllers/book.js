const Book = require("../Models/book");
const { cloudinaryUploader } = require("../utils/cloudinary");
const NewError = require("../utils/newError");

// Create Book

exports.addBook = async (req, res, next) => {
  try {
    if (req.role !== "admin" && req.role !== "seller") {
      return next(new NewError("This is not a Seller Account", 400));
    }
    let bookObj = { userId: req.user };
    if (req.files.image) {
      const fileUrl = await cloudinaryUploader(req.files.image[0]);
      bookObj = { ...bookObj, file: fileUrl };
    }
    if (req.files.file) {
      const imgUrl = await cloudinaryUploader(req.files.file[0]);
      bookObj = { ...bookObj, image: imgUrl };
    }
    const book = await Book.create({
      ...req.body,
      ...bookObj,
    });

    await book.save();
    res.status(201).json({
      status: true,
      message: "new Book added Succesfully",
      book,
    });
  } catch (error) {
    return next(
      new NewError(
        "An Error Occur in Adding new book. please try again!",
        400,
        error
      )
    );
  }
};

// Get All Book

exports.getTopRated = async (req, res, next) => {
  let sortOpt = {};
  if (req.query.rating) {
    sortOpt = { rating: -1 };
  }
  if (req.query.sale) {
    sortOpt = { sale: -1 };
  }
  // if (req.query.newArrival) {
  //   sortOpt = { [req.query.sale]: 1 };
  // }

  const filters = {
    ...(req.query.cat && { Cat: req.query.cat }),
    ...(req.query.onSale && { OldPrice: { $gt: price } }),
    ...(req.query.newArrival && { Cat: req.query.newArrival }),
  };

  try {
    const books = await Book.find(filters)
      .skip(req.query.page ? req.query.page * 10 - 10 : 0)
      .limit(req.query.limit && req.query.limit)
      .sort(sortOpt);
    if (!books) {
      return next(new NewError("No Book found", 400));
    }

    res.status(200).json({
      status: true,
      message: "Books fetched Succesfully",
      books,
    });
  } catch (error) {
    return next(new NewError("An Error Occur fetching books", 400, error));
  }
};
exports.getAllBooks = async (req, res, next) => {
  let sortOpt = {};
  if (req.query.rating) {
    sortOpt = { rating: -1 };
  }
  if (req.query.sale) {
    sortOpt = { sale: -1 };
  }

  // if (req.query.newArrival) {
  //   sortOpt = { [req.query.sale]: 1 };
  // }

  const filters = {
    ...(req.query.cat && { Cat: req.query.cat }),
    ...(req.query.onSale && { OldPrice: { $gt: price } }),
    ...(req.query.genre && { genre: req.query.genre }),
    ...(req.query.author && { author: req.query.author }),
    ...(req.query.search && {
      title: { $regex: req.query.search, $options: "i" },
    }),
  };

  try {
    const books = await Book.find(filters)
      .skip(req.query.page ? req.query.page * 10 - 10 : 0)
      .limit(req.query.limit && req.query.limit)
      .sort(sortOpt);
    if (!books) {
      return next(new NewError("No Book found", 400));
    }

    res.status(200).json({ books });
  } catch (error) {
    return next(new NewError("An Error Occur fetching books", 400, error));
  }
};

// Best Selling

// On Sale books

exports.getOnSale = async (req, res, next) => {
  let sortOpt = {};
  if (req.query.rating) {
    sortOpt = { rating: -1 };
  }
  if (req.query.sale) {
    sortOpt = { sale: 1 };
  }
  if (req.query.newArrival) {
    sortOpt = { [req.query.sale]: 1 };
  }

  const filters = {
    ...(req.query.cat && { Cat: req.query.cat }),
    ...(req.query.onSale && { OldPrice: { $gt: price } }),
    ...(req.query.newArrival && { Cat: req.query.newArrival }),
  };

  try {
    const books = await Book.find(filters)
      .skip(req.query.page ? req.query.page * 10 - 10 : 0)
      .limit(req.query.limit && req.query.limit)
      .sort(sortOpt);
    if (!books) {
      return next(new NewError("No Book found", 400));
    }

    res.status(200).json({
      status: true,
      message: "Books fetched Succesfully",
      books,
    });
  } catch (error) {
    return next(new NewError("An Error Occur fetching books", 400, error));
  }
};
exports.getNewArrival = async (req, res, next) => {
  //   let sortOpt = {};
  //   if (req.query.rating) {
  //     sortOpt = { rating: -1 };
  //   }
  //   if (req.query.sale) {
  //     sortOpt = { sale: 1 };
  //   }
  //   // if (req.query.newArrival) {
  //   //   sortOpt = { [req.query.sale]: 1 };
  //   // }
  //   const filters = {
  //     ...(req.query.cat && { Cat: req.query.cat }),
  //     ...(req.query.onSale && { OldPrice: { $gt: price } }),
  //     ...(req.query.newArrival && { Cat: req.query.newArrival }),
  //   };
  //   try {
  //     const books = await Book.find(filters)
  //       .skip(req.query.page ? req.query.page * 10 - 10 : 0)
  //       .limit(req.query.limit && req.query.limit)
  //       .sort(sortOpt);
  //     if (!books) {
  //       return next(new NewError("No Book found", 400));
  //     }
  //     res.status(200).json({
  //       status: true,
  //       message: "Books fetched Succesfully",
  //       books,
  //     });
  //   } catch (error) {
  //     return next(new NewError("An Error Occur fetching books", 400, error));
  //   }
};
exports.getBestSellingbk = async (req, res, next) => {
  let sortOpt = {};
  if (req.query.rating) {
    sortOpt = { rating: -1 };
  }
  if (req.query.sale) {
    sortOpt = { sale: -1 };
  }
  if (req.query.newArrival) {
    sortOpt = { [req.query.sale]: 1 };
  }
  const filters = {
    ...(req.query.cat && { Cat: req.query.cat }),
    ...(req.query.onSale && { OldPrice: { $gt: price } }),
    ...(req.query.newArrival && { Cat: req.query.newArrival }),
  };
  try {
    const books = await Book.find(filters)
      .skip(req.query.page ? req.query.page * 10 - 10 : 0)
      .limit(req.query.limit && req.query.limit)
      .sort(sortOpt);
    if (!books) {
      return next(new NewError("No Book found", 400));
    }
    res.status(200).json({
      status: true,
      message: "Books fetched Succesfully",
      books,
    });
  } catch (error) {
    return next(new NewError("An Error Occur fetching books", 400, error));
  }
};
exports.getBestCollection = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books) {
      return next(new NewError("geting books error", 400));
    }

    const genere = books.map((book) => {
      return { genere: book.genre, image: book.file };
    });

    if (!genere) {
      return next(new NewError("geting best collection error", 400));
    }

    const uniquie = [...new Set(genere)];

    res.status(200).json({ genere });
  } catch (error) {
    return next(new NewError("unable to get best collection", 400));
  }
};
exports.GetAllBooks = async (req, res, next) => {
  let sortOpt = {};
  if (req.query.rating) {
    sortOpt = { rating: -1 };
  }
  if (req.query.sale) {
    sortOpt = { sale: 1 };
  }
  if (req.query.newArrival) {
    sortOpt = { [req.query.sale]: 1 };
  }
  const filters = {
    ...(req.query.cat && { Cat: req.query.cat }),
    ...(req.query.onSale && { OldPrice: { $gt: price } }),
    ...(req.query.newArrival && { Cat: req.query.newArrival }),
  };
  try {
    const books = await Book.find(filters)
      .skip(req.query.page ? req.query.page * 10 - 10 : 0)
      .limit(req.query.limit && req.query.limit)
      .sort(sortOpt);
    if (!books) {
      return next(new NewError("No Book found", 400));
    }
    res.status(200).json({
      status: true,
      message: "Books fetched Succesfully",
      books,
    });
  } catch (error) {
    return next(new NewError("An Error Occur fetching books", 400, error));
  }
};

//Single Book

exports.GetSingleBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new NewError("No Book found", 400));
    }

    res.status(200).json({
      status: true,
      message: "Books fetched Succesfully",
      book,
    });
  } catch (error) {
    return next(new NewError("Unabel to get this Book", 400, error));
  }
};

// Remove Book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new NewError("book not found to be deleted", 400));
    }
    if (
      book.userId.toString() !== req.user.toString() &&
      req.role !== "admin"
    ) {
      return next(
        new NewError("You are not authorized to delete this book", 400)
      );
    }

    const removedBook = await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: true,
      message: "Books Deleted Succesfully",
    });
  } catch (error) {
    return next(new NewError("An Error Occur deleting book", 400, error));
  }
};

//upDate book
exports.getGenre = async (req, res, next) => {
  try {
    const book = await Book.find();
    if (!book) {
      return next(new NewError("book not found ", 400));
    }
    const genres = [...new Set(book.map((b) => b.genre))];

    res.status(200).json({
      status: true,
      message: "Book getAuthors Succesfully",
      genres,
    });
  } catch (error) {
    return next(new NewError("An Error Occur getAuthors book", 400, error));
  }
};
exports.getAuthors = async (req, res, next) => {
  try {
    const book = await Book.find();
    if (!book) {
      return next(new NewError("book not found ", 400));
    }
    const authors = [...new Set(book.map((b) => b.author))];

    res.status(200).json({
      status: true,
      message: "Book getAuthors Succesfully",
      authors,
    });
  } catch (error) {
    return next(new NewError("An Error Occur getAuthors book", 400, error));
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(new NewError("book not found to  Edit", 400));
    }

    if (
      book.userId.toString() !== req.user.toString() &&
      req.role !== "admin"
    ) {
      return next(
        new NewError("You are not authorized to Edit this book details", 400)
      );
    }
    console.log(req.user, book.userId);

    const EditedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Book updated Succesfully",
      EditedBook,
    });
  } catch (error) {
    return next(new NewError("An Error Occur updating book", 400, error));
  }
};
