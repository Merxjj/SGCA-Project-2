const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.use(isAuthenticated, authorizeRoles('school_admin', 'security_guard'));

router.get('/', attendanceController.getAttendanceLogs);
router.post('/mark', attendanceController.markAttendance);

module.exports = router;
