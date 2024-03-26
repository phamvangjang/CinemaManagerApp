const connection = require('../common/connect');

const FoodOrders = {
    addFoodOrders: function(BookingId, FoodId, Quantity, callback){
        connection.query('INSERT INTO FoodOrders (BookingId, FoodId, Quantity) VALUES (?, ?, ?)', [BookingId, FoodId, Quantity], callback);
    }
};

module.exports = FoodOrders;