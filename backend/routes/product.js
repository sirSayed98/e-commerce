const express = require("express");
const {
  getProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/product");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("admin"), createProduct);

router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, authorize("admin"), deleteProduct)
  .put(protect, authorize("admin"), updateProduct);

module.exports = router;
