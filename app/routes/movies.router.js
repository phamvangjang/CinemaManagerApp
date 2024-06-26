const express = require('express');
const router = express.Router();

var moviesController = require('../controllers/movies.controller');

router.post('/add', moviesController.addMovie);
router.get('/getLists', moviesController.getAllMovies);
router.get('/getMoviesbydate', moviesController.getMoviesWhereByDate);
router.put('/update/:id', moviesController.updateMovie);
router.delete('/delete/:id', moviesController.deleteMovie);
router.get('/findByName/:name', moviesController.findByName);
router.get('/findByNamebyclient/:name', moviesController.findByNamebyClient);
router.get('/filtByGenreId/:genreId', moviesController.getMoviesByGenreId);
router.get('/detail/:movieId', moviesController.getMovieById);
router.get('/getMoviesbytime', moviesController.getMoviesByTime);


module.exports = router;
