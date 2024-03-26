const RoomScreening = require('../models/RoomScreening.model');


exports.getAllRoomScreening = (req, res) => {
    const { movieId } = req.params;
    RoomScreening.getAllRoomScreening(movieId, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'roomScreening not found' });
        }
        res.status(200).json({ roomScreening: results });
    });
};
