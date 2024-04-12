const Bookings = require('../models/Bookings.model');

exports.addBookings = (req, res) => {
    const { ShowtimeId, UserId, QuantityTickets, TotalPrice } = req.body;

    Bookings.addBookings(ShowtimeId, UserId, QuantityTickets, TotalPrice, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: 'Bookings added successfully', Bookings: { ShowtimeId, UserId, QuantityTickets, TotalPrice } });
    });
};

exports.getAllBookings = (req, res) => {
    Bookings.getAllBookings((error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ Bookings: results });
    });
};

exports.updateBookings = (req, res) => {
    const { BookingId } = req.params;
    const { ShowtimeId, UserId, QuantityTickets, TotalPrice } = req.body;

    Bookings.updateBookings(BookingId, ShowtimeId, UserId, QuantityTickets, TotalPrice, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Bookings updated successfully', Bookings: { BookingId, ShowtimeId, UserId, QuantityTickets, TotalPrice } });
    });
};

exports.deleteBookings = (req, res) => {
    const { BookingId } = req.params;

    Bookings.deleteBookings(BookingId, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Bookings deleted successfully' });
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