const Movies = require('../models/movies.model');

exports.addMovie = (req, res) => {
    const { name, description, releaseDate, duration, banner, trailer, genreId, price } = req.body;

    // Add the movie to the database
    Movies.addMovie(name, description, releaseDate, duration, banner, trailer, genreId, price, (error, movieId) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Movie added successfully', movieId });
    });
};

exports.getAllMovies = (req, res) => {
    Movies.getAllMovies((error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ Movies: results });
    });
};

exports.updateMovie = (req, res) => {
    const { id } = req.params;
    const { name, description, releaseDate, duration, banner, trailer, genreId } = req.body;

    // Update genre of the movie in the database
    Movies.updateMovie(id, name, description, releaseDate, duration, banner, trailer, genreId, (error, updated) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!updated) {
            return res.status(404).json({ message: 'Movie not found or no changes were made' });
        }
        res.status(200).json({ message: 'Movie updated successfully' });
    });
};

exports.deleteMovie = (req, res) => {
    const { id } = req.params;

    // Delete the movie from the database
    Movies.deleteMovie(id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    });
};

exports.findByName = (req, res) => {
    const { name } = req.params;

    // Find the genre by name in the database
    Movies.findByName(name, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ Movies: results });
    });
};

exports.getMoviesByGenreId = (req, res) => {
    const { genreId } = req.params;

    // Fetch movies by genreId from the database
    Movies.getMoviesByGenreId(genreId, (error, movies) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ movies });
    });
};

exports.getMovieById = (req, res) => {
    const { movieId } = req.params;

    // Fetch movie by MovieId from the database
    Movies.getMovieById(movieId, (error, Movies) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!Movies) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ Movies });
    });
};