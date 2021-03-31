const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const User = require("../models/User");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.route("/").post(createUser);

router
  .route("/:id")
  .put(protect, authorize('admin','user'), updateUser)
  .get(getUser);

router.route("/").get(protect, authorize("admin"), getUsers);

router.route("/:id").delete(protect, authorize("admin"), deleteUser);

module.exports = router;
