const multer = require("multer");

const storage = multer.memoryStorage();

exports.upload = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
