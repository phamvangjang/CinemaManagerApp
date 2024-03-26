const express = require('express');
const router = express.Router();
const roomScreeningController = require('../controllers/RoomScreening.controller');

router.get('/getRoomScreeningById/:movieId', roomScreeningController.getAllRoomScreening);

module.exports = router;