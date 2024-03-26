// movieRoutes.js
const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

router.post('/add', genreController.addGenre);
router.get('/getLists', genreController.getAllGenres);
router.put('/update/:GenreId', genreController.updateGenre);
router.delete('/delete/:GenreId', genreController.deleteGenre);
router.get('/findByName/:name', genreController.findByName);

module.exports = router;
