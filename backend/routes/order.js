const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getOrders,
} = require("../controllers/order");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, authorize("admin"), getOrders);

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, authorize("admin"), updateOrderToDelivered);
  
module.exports = router;
