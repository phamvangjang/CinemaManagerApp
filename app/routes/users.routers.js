// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/register', userController.registerUser);
router.post('/signin', userController.signIn);
router.post('/logout', userController.logout);
router.get('/getUserById/:userId', userController.getUserById);
router.put('/edit/:userId', userController.editUser);
router.get('/getLists', userController.getAllUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/findByName/:name', userController.findUserByName);

module.exports = router;
