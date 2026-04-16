const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/profile', authController.getProfile);

module.exports = router;
