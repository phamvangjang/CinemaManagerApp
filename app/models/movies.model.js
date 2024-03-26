const connection = require('../common/connect');

const Movies = {
    addMovie: function (name, description, releaseDate, duration, banner, trailer, genreId, price, callback) {
        connection.query('INSERT INTO Movies (Name, Description, ReleaseDate, Duration, Banner, Trailer, GenreId, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, releaseDate, duration, banner, trailer, genreId, price], (error, result) => {
                if (error) {
                    return callback(error);
                }
                callback(null, result.insertId); // Pass the inserted movie's ID to the callback
            });
    },

    getAllMovies: function (callback) {
        connection.query('SELECT * FROM Movies', callback);
    },

    updateMovie: function (id, name, description, releaseDate, duration, banner, trailer, genreId, callback) {
        connection.query('UPDATE Movies SET Name=?, Description = ?, ReleaseDate = ?, Duration = ?, Banner = ?, Trailer = ?, GenreId = ? WHERE MovieId = ?', [name, description, releaseDate, duration, banner, trailer, genreId, id], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result.affectedRows > 0); // Pass a boolean indicating whether the update was successful to the callback
        });
    },

    deleteMovie: function (id, callback) {
        connection.query('DELETE FROM Movies WHERE MovieId = ?', [id], callback);
    },

    findByName: function (name, callback) {
        connection.query('SELECT * FROM Movies WHERE Name LIKE ?', [`%${name}%`], callback);
    },

    getMoviesByGenreId: function (genreId, callback) {
        connection.query('SELECT * FROM Movies WHERE GenreId = ?', [genreId], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    },

    getMovieById: function (movieId, callback) {
        connection.query('SELECT * FROM Movies WHERE MovieId = ?', [movieId], (error, results) => {
            if (error) {
                return callback(error);
            }
            if (results.length === 0) {
                return callback(null, null); // Movie not found
            }
            callback(null, results[0]);
        });
    }
};

module.exports = Movies;