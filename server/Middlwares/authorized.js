const jwt = require("jsonwebtoken");
const NewError = require("../utils/newError");

exports.authorized = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new NewError("Token not found", 400));
  }
  console.log(token);
  const userData = jwt.verify(token, process.env.JWT_SEC);
  if (!userData) {
    return next(new NewError("Token is not valid try login again", 400));
  }
  req.user = userData.userId; // Attach userId to req.user
  req.role = userData.role;

  next();
};
