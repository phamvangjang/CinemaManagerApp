const connection = require('../common/connect');

const showTimes = {
    getShowTimeById: function (MovieId, RoomScreeningId, callback) {
        connection.query('SELECT StartTime,EndTime FROM showtimes WHERE MovieId = ? AND RoomScreeningId = ?', [MovieId, RoomScreeningId], callback);
    }
};

module.exports = showTimes;