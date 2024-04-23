const Seat = require('../models/seat.model');

exports.getAllSeats = (req, res) => {
    Seat.getAllSeats((error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ Seats: results });
    });
};