const NewError = require("../utils/newError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../Models/user");
const { cloudinaryUploader } = require("../utils/cloudinary");
exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new NewError("email & password feilds are required", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new NewError("invalid Credentials", 400));
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return next(new NewError("invalid Credentials", 404));
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SEC
    );

    res.cookie("token", token, { httpOnly: true }).status(201).json({
      status: true,
      message: "user Logged in succesfully",
      user,
      token,
    });
  } catch (error) {
    next(new NewError("something went wrong in loging in", 400, error));
  }
};

exports.userRegister = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await cloudinaryUploader(req.files.image[0]);
  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(new NewError("This user Already Exist", 400));
    }

    const hashedPass = await bcrypt.hash(password, 10);
    if (!hashedPass) {
      return next(new NewError("invalid Credentials", 404));
    }
    const newUser = await User.create({
      ...req.body,
      password: hashedPass,
      image: result,
    });
    await newUser.save();
    res.status(201).json({
      status: true,
      message: "user Logged in succesfully",
      newUser,
    });
  } catch (error) {
    next(new NewError("something went wrong in loging in", 400, error));
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return next(new NewError("user Not found Please Login", 400));
    }

    res.status(200).json({
      status: true,
      message: "user fetched in succesfully",
      user,
    });
  } catch (error) {
    next(new NewError("something went wrong getting user", 400, error));
  }
};
exports.LogOutUser = async (req, res, next) => {
  try {
    res.status(200).cookie("token", "").json({
      status: true,
      message: "user fetched in succesfully",
    });
  } catch (error) {
    next(new NewError("user logged out ", 400, error));
  }
};
