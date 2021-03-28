const express = require("express");
const router = express.Router();
const { addOrderItems,getOrderById } = require("../controllers/order");

const { protect } = require("../middleware/auth");


router.route("/").post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById)

module.exports = router;
