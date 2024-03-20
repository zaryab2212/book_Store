const express = require("express");
const {
  userRegister,
  userLogin,
  getUser,
  LogOutUser,
} = require("../Controllers/auth");
const { upload } = require("../Middlwares/multer");
const { authorized } = require("../Middlwares/authorized");

const router = express.Router();

router.post("/register", upload, userRegister);
router.post("/login", upload, userLogin);
router.get("/get", authorized, getUser);
router.get("/logout", authorized, LogOutUser);

module.exports = router;
