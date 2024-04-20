// userModel.js
const users = [];
// userModel.js
const connection = require('../common/connect'); // Assuming you have a connection to MySQL

const User = {
  findByEmail: function (email, callback) {
    connection.query('SELECT * FROM Users WHERE BINARY Email = ?', email, callback);
  },

  logout: function (accessToken, callback) {
    callback({ success: true });
  },

  getUserById: function (userId, callback) {
    connection.query('SELECT * FROM Users WHERE UserId = ?', [userId], (error, results) => {
      if (error) {
        return callback(error);
      }
      if (results.length === 0) {
        return callback(null, null); // Movie not found
      }
      callback(null, results[0]);
    });
  },

  //edit User
  updateUser: function (userId, userData, callback) {
    const { Username, Password, Avatar } = userData;
    connection.query('UPDATE Users SET Username = ?, Password = ?, Avatar = ? WHERE UserId = ?', [Username, Password, Avatar, userId], callback);
  },

  getUserPasswordById: (userId, callback) => {
    connection.query('SELECT Password FROM Users WHERE UserId = ?', [userId], callback);
  },

  getAllUsers: function (callback) {
    connection.query('SELECT * FROM Users', callback);
  },
};



module.exports = users;
module.exports = User;
