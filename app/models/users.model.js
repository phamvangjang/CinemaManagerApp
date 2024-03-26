// userModel.js
const users = [];
// userModel.js
const connection = require('../common/connect'); // Assuming you have a connection to MySQL

const User = {
  findByEmail: function (email, callback) {
    connection.query('SELECT * FROM Users WHERE Email = ?', email, callback);
  },

  logout: function (accessToken, callback) {
    callback({ success: true });
  }
};

module.exports = users;
module.exports = User;
