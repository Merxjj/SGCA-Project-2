const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.signup);
router.get('/logout', isAuthenticated, authController.logout);
router.get('/profile', isAuthenticated, authorizeRoles('student'), authController.getProfile);

module.exports = router;
