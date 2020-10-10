const express = require('express');

const {
    login,
    getMe,
    logout
} = require('../controllers/auth');


const { protect } = require('../middleware/auth');
const router = express.Router();


router
    .route('/me')
    .get(protect, getMe)

router
    .route('/login')
    .post(login);
router
    .get('/logout', logout);
module.exports = router;