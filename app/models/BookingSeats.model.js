const connection = require('../common/connect');

const BookingSeats = {
    getSeatByMovieId: function (movieId, callback) {
        connection.query('SELECT SeatId FROM BookingSeats WHERE MovieId = ?', [movieId], (error, results) => {
            if (error) {
                return callback(error);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            callback(null, results);
        });
    }
};

module.exports = BookingSeats;