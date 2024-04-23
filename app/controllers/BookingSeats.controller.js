const BookingSeats = require('../models/BookingSeats.model');

exports.getSeatByMovieId = (req, res) => {
    const { movieId } = req.params;

    BookingSeats.getSeatByMovieId(movieId, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!results) {
            return res.status(404).json({ message: 'No seats booked for this movie' });
        }
        const selectedSeats = results.map(result => result.SeatId);
        res.status(200).json({ selectedSeats });
    });
};