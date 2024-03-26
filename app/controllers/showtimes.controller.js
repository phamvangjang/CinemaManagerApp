const showTimes = require('../models/showtimes.model');

exports.getShowTimeById = (req, res) => {
    const { MovieId, RoomScreeningId } = req.params;

    // Find the genre by name in the database
    showTimes.getShowTimeById(MovieId, RoomScreeningId, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'showTimes not found' });
        }

        res.status(200).json({ showTimes: results });
    });
};


