const express = require("express");
const router = express.Router();
const { addOrderItems } = require("../controllers/order");

const { protect } = require("../middleware/auth");


router.route("/").post(protect, addOrderItems);

module.exports = router;
