const Bookings = require('../models/Bookings.model');

exports.getAllBookings = (req, res) => {
    Bookings.getAllBookings((error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ Bookings: results });
    });
};

//booking ticket movie 
exports.bookTickets = (req, res) => {
    const { userId, movieId, seatIds, totalPrice } = req.body;

    Bookings.bookTickets(userId, movieId, seatIds, totalPrice, (err) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while booking tickets.' });
        }

        res.status(200).json({ message: 'Tickets booked successfully.' });
    });
};

exports.getBookingsByUserId = (req, res) => {
    const { UserId } = req.params;

    // Fetch movie by MovieId from the database
    Bookings.getBookingsByUserId(UserId, (error, Bookings) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!Bookings) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ Bookings });
    });
};