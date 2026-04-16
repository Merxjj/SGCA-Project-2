const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/add', userController.createUser);
router.post('/delete/:id', userController.deleteUser); // Logic to remove users

module.exports = router;
