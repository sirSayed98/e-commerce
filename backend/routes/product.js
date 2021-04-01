const express = require("express");
const {
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/product");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, authorize("admin"), deleteProduct);
module.exports = router;
