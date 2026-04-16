const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const upload = require('../middleware/upload');

router.get('/', studentController.getStudents);
router.post('/add', upload.single('studentImage'), studentController.createStudent);

module.exports = router;
