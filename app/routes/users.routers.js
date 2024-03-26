// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/register', userController.registerUser);
router.post('/signin', userController.signIn);
router.post('/logout', userController.logout);

module.exports = router;
