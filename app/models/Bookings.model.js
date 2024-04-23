const connection = require('../common/connect');

const Bookings = {
    getAllBookings: function (callback) {
        connection.query('SELECT * FROM Bookings', callback);
    },
    
    //booking ticket movie 
    bookTickets(userId, movieId, seatIds, totalPrice, callback) {
        const bookingQuery = 'INSERT INTO Bookings (UserId, MovieId, BookingTime, TotalPrice) VALUES (?, ?, NOW(), ?)';
        const seatQuery = 'INSERT INTO BookingSeats (BookingId, MovieId, SeatId) VALUES ?';

        connection.query(bookingQuery, [userId, movieId, totalPrice], (err, result) => {
            if (err) {
                return callback(err);
            }

            const bookingId = result.insertId;
            const seatValues = seatIds.map(seatId => [bookingId, movieId, seatId]);

            connection.query(seatQuery, [seatValues], (err) => {
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    }, 

    getBookingsByUserId: function (UserId, callback) {
        connection.query('SELECT * FROM Bookings WHERE UserId = ?', [UserId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
};

module.exports = Bookings;