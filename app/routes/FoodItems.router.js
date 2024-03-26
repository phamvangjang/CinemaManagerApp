const express = require('express');
const router = express.Router();
const FoodItemsController = require('../controllers/FoodItems.controller');

router.post('/add', FoodItemsController.addFood);
router.get('/getLists', FoodItemsController.getAllFood);
router.put('/update/:FoodItemId', FoodItemsController.updateFood);
router.delete('/delete/:FoodItemId', FoodItemsController.deleteFood);
router.get('/findByName/:name', FoodItemsController.findByName);

module.exports = router;