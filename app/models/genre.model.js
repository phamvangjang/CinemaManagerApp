const connection = require('../common/connect'); // Assuming you have a connection to MySQL

const Genre = {
  addGenre: function(Name, Banner, callback) {
    connection.query('INSERT INTO Genres (Name, Banner) VALUES (?, ?)', [Name, Banner], callback);
  },

  getAllGenres: function(callback) {
    connection.query('SELECT * FROM Genres', callback);
  },

  updateGenre: function(GenreId, newName, newBanner, callback) {
    connection.query('UPDATE Genres SET Name = ?, Banner = ? WHERE GenreId = ?', [newName, newBanner, GenreId], callback);
  },

  deleteGenre: function(GenreId, callback) {
    connection.query('DELETE FROM Genres WHERE GenreId = ?', [GenreId], callback);
  },

  findByName: function(name, callback) {
    connection.query('SELECT * FROM Genres WHERE Name LIKE ?', [`%${name}%`], callback);
  }
};

module.exports = Genre;