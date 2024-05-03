const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { createBookings, getBookings } = require('../controllers/bookingController');
const router = express.Router();

router.route('/').post(isLoggedIn, createBookings);

router.route('/').get(isLoggedIn, getBookings);
module.exports = router;
