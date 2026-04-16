const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.use(isAuthenticated, authorizeRoles('super_admin'));

router.get('/', schoolController.getSchools);
router.post('/add', schoolController.createSchool);

module.exports = router;
