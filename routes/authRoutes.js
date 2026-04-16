const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.get('/profile', authController.getProfile);

module.exports = router;
