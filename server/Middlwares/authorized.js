const jwt = require("jsonwebtoken");
const NewError = require("../utils/newError");

exports.authorized = async (req, res, next) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRmMzQyNDJhYWFhN2MwMTk2MzgwODUiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzEwNDA2MDE5fQ.BLyDkQzoQdb43PuAYG6oDWvIO3Hny_jfa8v8gStiTDg";
  if (!token) {
    return next(new NewError("Token not found", 400));
  }
  const userData = jwt.verify(token, process.env.JWT_SEC);
  if (!userData) {
    return next(new NewError("Token is not valid try login again", 400));
  }
  req.user = userData.userId; // Attach userId to req.user
  req.role = userData.role;

  next();
};
