const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

const User = require('../models/User');

const router = express.Router();


const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(createUser);
  
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers)


router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router;