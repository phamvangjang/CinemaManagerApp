const express = require('express');
const router = express.Router();
const showTimesController = require('../controllers/showtimes.controller');

// GET route to add a showtime
router.get('/getShowTimeById/:MovieId/:RoomScreeningId', showTimesController.getShowTimeById);

module.exports = router;
