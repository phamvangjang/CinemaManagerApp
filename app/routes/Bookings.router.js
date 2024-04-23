const express = require('express');
const router = express.Router();
const BookingsController = require('../controllers/Bookings.controller');

router.get('/getListBookings', BookingsController.getAllBookings);
router.post('/book', BookingsController.bookTickets);
router.get('/findByUser/:UserId', BookingsController.getBookingsByUserId);

module.exports = router;
