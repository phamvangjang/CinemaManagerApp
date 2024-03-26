const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seat.controller');

router.get('/getSeatById/:MovieId/:RoomScreeningId', seatController.getSeatById);

module.exports = router;