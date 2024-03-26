const BookingSeats = require('../models/BookingSeats.model');

exports.addBookingSeats = (req, res) => {
  const { BookingId, SeatId } = req.body;

  // Add genre to the database
  BookingSeats.addBookingSeats(BookingId, SeatId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'BookingSeats added successfully', BookingSeats: { BookingId, SeatId } });
  });
};