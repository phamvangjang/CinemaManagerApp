const connection = require('../common/connect'); 
const Food = {
    addFood: function(Name, Price, callback) {
        connection.query('INSERT INTO FoodItems (Name, Price) VALUES (?, ?)', [Name, Price], callback);
    },

    getAllFood: function(callback) {
        connection.query('SELECT * FROM FoodItems', callback);
      },
    
    updateFood: function(FoodItemId, newName, newPrice, callback) {
        connection.query('UPDATE FoodItems SET Name = ?, Price = ? WHERE FoodItemId = ?', [newName, newPrice, FoodItemId], callback);
    },

    deleteFood: function(FoodItemId, callback) {
        connection.query('DELETE FROM FoodItems WHERE FoodItemId = ?', [FoodItemId], callback);
    },

    findByName: function(name, callback) {
        connection.query('SELECT * FROM FoodItems WHERE Name LIKE ?', [`%${name}%`], callback);
    }
}

module.exports = Food;