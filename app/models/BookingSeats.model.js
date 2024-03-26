const connection = require('../common/connect');

const BookingSeats = {
    addBookingSeats: function (BookingId, SeatId, callback) {
        connection.query('INSERT INTO BookingSeats (BookingId, SeatId) VALUES (?, ?)', [BookingId, SeatId], callback);
    }
};

module.exports = BookingSeats;