const Food = require('../models/FoodItems.model');

exports.addFood = (req, res) => {
  const { Name, Price } = req.body;

  Food.addFood(Name, Price, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Food added successfully', FoodItems: { Name, Price } });
  });
};

exports.getAllFood = (req, res) => {
  Food.getAllFood((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ FoodItems: results });
  });
};

exports.updateFood = (req, res) => {
  const { FoodItemId } = req.params;
  const { Name, Price } = req.body;


  Food.updateFood(FoodItemId, Name, Price, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Food updated successfully' });
  });
};

exports.deleteFood = (req, res) => {
  const { FoodItemId } = req.params;

  // Delete the genre from the database
  Food.deleteFood(FoodItemId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'FoodItem deleted successfully' });
  });
};

exports.findByName = (req, res) => {
  const { name } = req.params;

  // Find the genre by name in the database
  Food.findByName(name, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'FoodItem not found' });
    }

    res.status(200).json({ FoodItems: results });
  });
};