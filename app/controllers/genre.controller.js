// movieController.js
const Genre = require('../models/genre.model');

exports.addGenre = (req, res) => {
  const { Name, Banner } = req.body;

  // Add genre to the database
  Genre.addGenre(Name, Banner, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Genre added successfully', genre: { Name, Banner } });
  });
};

exports.getAllGenres = (req, res) => {
  // Fetch all genres from the database
  Genre.getAllGenres((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ genres: results });
  });
};

exports.updateGenre = (req, res) => {
  const { GenreId } = req.params;
  const { Name, Banner } = req.body;

  // Update genre of the movie in the database
  Genre.updateGenre(GenreId, Name, Banner, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Genre updated successfully' });
  });
};

exports.deleteGenre = (req, res) => {
  const { GenreId } = req.params;

  // Delete the genre from the database
  Genre.deleteGenre(GenreId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Genre deleted successfully' });
  });
};

exports.findByName = (req, res) => {
  const { name } = req.params;

  // Find the genre by name in the database
  Genre.findByName(name, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    res.status(200).json({ genres: results });
  });
};