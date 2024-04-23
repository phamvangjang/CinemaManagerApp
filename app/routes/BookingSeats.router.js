const express = require('express');
const router = express.Router();
const BookingSeatsController = require('../controllers/BookingSeats.controller');


router.get('/selectedSeats/:movieId', BookingSeatsController.getSeatByMovieId);

module.exports = router;