const express = require('express');
const router = express.Router();
const BookingsController = require('../controllers/Bookings.controller');

router.get('/getListBookings', BookingsController.getAllBookings);
router.post('/add', BookingsController.addBookings);
router.put('/update/:BookingId', BookingsController.updateBookings);
router.delete('/delete/:BookingId', BookingsController.deleteBookings);

router.post('/book', BookingsController.bookTickets);
router.get('/findByUser/:UserId', BookingsController.getBookingsByUserId);

module.exports = router;
