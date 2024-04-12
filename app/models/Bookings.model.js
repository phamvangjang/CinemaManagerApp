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

    //booking ticket movie 
    bookTickets(userId, movieId, seatIds, totalPrice, callback) {
        // const totalPrice = seatIds.length * 10; // Assuming ticket price is $10
        const bookingQuery = 'INSERT INTO Bookings (UserId, MovieId, BookingTime, TotalPrice) VALUES (?, ?, NOW(), ?)';
        const seatQuery = 'INSERT INTO BookingSeats (BookingId, MovieId, SeatId) VALUES ?';

        connection.query(bookingQuery, [userId, movieId, totalPrice], (err, result) => {
            if (err) {
                connection.rollback(() => {
                    connection.release();
                    callback(err);
                });
            }

            const bookingId = result.insertId;
            const seatValues = seatIds.map(seatId => [bookingId, movieId, seatId]);

            connection.query(seatQuery, [seatValues], (err) => {
                if (err) {
                    connection.rollback(() => {
                        connection.release();
                        callback(err);
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            connection.release();
                            callback(err);
                        });
                    }

                    connection.release();
                    callback(null);
                });
            });
        });
    }
};

module.exports = Bookings;