const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(isAuthenticated, authorizeRoles('school_admin', 'teacher'));

router.get('/', studentController.getStudents);
router.post('/add', upload.single('studentImage'), studentController.createStudent);

module.exports = router;
