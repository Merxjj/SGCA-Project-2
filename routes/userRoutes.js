const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.use(isAuthenticated, authorizeRoles('super_admin', 'school_admin'));

router.get('/', userController.getUsers);
router.post('/add', userController.createUser);
router.post('/delete/:id', userController.deleteUser); // Logic to remove users

module.exports = router;
