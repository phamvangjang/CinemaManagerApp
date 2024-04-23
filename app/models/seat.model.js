const connection = require('../common/connect');

const Seat = {
    getAllSeats: function (callback) {
        connection.query('SELECT * FROM Seats', callback);
    }
}

module.exports = Seat;
