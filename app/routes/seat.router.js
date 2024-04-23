const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seat.controller');

router.get('/getLists', seatController.getAllSeats);

module.exports = router;