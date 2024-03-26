const express = require('express');
const router = express.Router();
const FoodOrdersController = require('../controllers/FoodOrders.controller');

router.post('/add', FoodOrdersController.addFoodOrders);

module.exports = router;