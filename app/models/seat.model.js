const connection = require('../common/connect');

const Seat = {
    getSeatById: function (MovieId, RoomScreeningId, callback) {
        connection.query('SELECT Seats.SeatId,Seats.SeatNumber, Seats.IsAvailable FROM Seats INNER JOIN RoomScreenings ON RoomScreenings.RoomScreeningId = Seats.RoomScreeningId INNER JOIN Showtimes ON Showtimes.RoomScreeningId = RoomScreenings.RoomScreeningId WHERE Showtimes.MovieId = ? AND Showtimes.RoomScreeningId = ?', [MovieId, RoomScreeningId], callback);
    }
}

module.exports = Seat;