const connection = require('../common/connect');

const Bookings = {
    addBookings: function (ShowtimeId, UserId, QuantityTickets, TotalPrice, callback) {
        connection.query('INSERT INTO Bookings (ShowtimeId, UserId, QuantityTickets, TotalPrice) VALUES (?, ?, ?, ?)', [ShowtimeId, UserId, QuantityTickets, TotalPrice], callback);
    },

    getAllBookings: function (callback) {
        connection.query('SELECT * FROM Bookings', callback);
    },

    updateBookings: function (BookingId, ShowtimeId, UserId, QuantityTickets, TotalPrice, callback) {
        connection.query('UPDATE Bookings SET ShowtimeId = ?, UserId = ?, QuantityTickets = ?, TotalPrice = ? WHERE BookingId = ?', [ShowtimeId, UserId, QuantityTickets, TotalPrice, BookingId], callback);
    },

    deleteBookings: function (BookingId, callback) {
        connection.query('DELETE FROM Bookings WHERE BookingId = ?', [BookingId], callback);
    },
};

module.exports = Bookings;