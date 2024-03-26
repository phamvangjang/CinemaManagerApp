const express = require('express');
const router = express.Router();
const BookingSeatsController = require('../controllers/BookingSeats.controller');

router.post('/add', BookingSeatsController.addBookingSeats);

module.exports = router;