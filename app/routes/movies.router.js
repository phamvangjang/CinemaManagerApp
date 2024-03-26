const express = require('express');
const router = express.Router();

var moviesController = require('../controllers/movies.controller');

router.post('/add', moviesController.addMovie);
router.get('/getLists', moviesController.getAllMovies);
router.put('/update/:id', moviesController.updateMovie);
router.delete('/delete/:id', moviesController.deleteMovie);
router.get('/findByName/:name', moviesController.findByName);
router.get('/filtByGenreId/:genreId', moviesController.getMoviesByGenreId);
router.get('/detail/:movieId', moviesController.getMovieById);

module.exports = router;
