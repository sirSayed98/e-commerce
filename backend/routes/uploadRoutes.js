const path = require("path");
const express = require("express");

const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  console.log(req.files);
  const file = req.files.image;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > 1000000) {
    return next(
      new ErrorResponse(`Please upload an image less than ${1000000}`, 400)
    );
  }

  // Create custom filename
  file.name = `${Date.now()}_${file.name}`;

  file.mv(`public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
  });

  res.status(200).json(`/uploads/${file.name}`);
});

module.exports = router;
