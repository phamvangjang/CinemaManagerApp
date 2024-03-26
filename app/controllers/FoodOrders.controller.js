const FoodOrders = require('../models/FoodOrders.model');

exports.addFoodOrders = (req, res) => {
    const { BookingId, FoodId, Quantity } = req.body;


    FoodOrders.addFoodOrders(BookingId, FoodId, Quantity, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: 'FoodOrders added successfully', FoodOrders: { BookingId, FoodId, Quantity } });
    });
};