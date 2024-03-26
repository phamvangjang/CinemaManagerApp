const connection = require('../common/connect');

const RoomScreening = {
    getAllRoomScreening: function (movieId, callback) {
        connection.query(
            `SELECT DISTINCT RoomScreenings.RoomScreeningId, RoomScreenings.RoomName 
                FROM RoomScreenings 
                INNER JOIN Showtimes ON RoomScreenings.RoomScreeningId = Showtimes.RoomScreeningId 
                WHERE MovieId = ?`,
            [movieId],
            callback);
    }
};

module.exports = RoomScreening;



