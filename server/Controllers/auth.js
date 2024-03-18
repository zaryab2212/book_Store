const NewError = require("../utils/newError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../Models/user");
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
