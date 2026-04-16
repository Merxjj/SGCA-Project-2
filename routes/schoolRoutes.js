const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/', schoolController.getSchools);
router.post('/add', schoolController.createSchool);

module.exports = router;
