// userController.js
const bcrypt = require('bcrypt');
const connection = require('../common/connect'); // Import the database connection
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
  const { Username, Password, Email } = req.body;

  // Check if user already exists in the database
  connection.query('SELECT * FROM Users WHERE Email = ?', Email, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    bcrypt.hash(Password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      // Insert new user into the database
      const newUser = {
        Username,
        Password: hash,
        Email
      };

      connection.query('INSERT INTO Users SET ?', [newUser], (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        newUser.UserId = result.insertId; // Assign the generated userid to the newUser object
        res.status(201).json({ message: 'User created successfully', user: newUser });
      });
    });
  });
};

//sign in
exports.signIn = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // Compare passwords
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Passwords match, user is authenticated
      const token = jwt.sign({ userId: user.UserId, Email: user.Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Sign-in successful', user: { UserId: user.UserId, email: user.Email, avatar: user.Avatar, role: user.Role }, token });
    });
  });
};

//sign out
exports.logout = (req, res) => {
  const accessToken = req.headers.authorization;
  User.logout(accessToken, (result) => {
    if (result.success) {
      res.json({ message: 'User logged out successfully' });
    } else {
      res.status(500).json({ message: 'Failed to logout user' });
    }
  });
};


exports.getUserById = (req, res) => {
  const { userId } = req.params;

  // Fetch movie by MovieId from the database
  User.getUserById(userId, (error, Users) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ Users });
  });
};

//edit User
exports.editUser = (req, res) => {
  const userId = req.params.userId;
  const { oldPassword, newPassword, userData } = req.body;

  // Retrieve user data including the password
  User.getUserPasswordById(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userPassword = result[0].Password;

    // Compare old password with the hashed password retrieved from the database
    bcrypt.compare(oldPassword, userPassword, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect old password' });
      }

      // Hash the new password before updating it in the database
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Update user information with the new data
        const updatedUserData = { ...userData, Password: hashedPassword };
        User.updateUser(userId, updatedUserData, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ message: 'User information updated successfully' });
        });
      });
    });
  });
};

exports.getAllUser = (req, res) => {
  User.getAllUsers((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ Users: results });
  });
};
