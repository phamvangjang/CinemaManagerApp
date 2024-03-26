const Seat = require('../models/seat.model');

exports.getSeatById = (req, res) => {
    const { MovieId, RoomScreeningId } = req.params;

    // Find the genre by name in the database
    Seat.getSeatById(MovieId, RoomScreeningId, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        res.status(200).json({ seat: results });
    });
};