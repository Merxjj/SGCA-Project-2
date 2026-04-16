const Student = require('../models/Student');
const School = require('../models/School');
const QRCode = require('qrcode');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('schoolId').sort({ name: 1 });
        const schools = await School.find();
        res.render('students', { students, schools });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { rollNo, name, class: studentClass, bloodGroup, schoolId } = req.body;
        const imgUrl = req.file ? `/uploads/${req.file.filename}` : '';

        // Generate QR Code containing the Roll Number
        const qrCodeData = await QRCode.toDataURL(rollNo);

        await Student.create({
            rollNo,
            name,
            class: studentClass,
            bloodGroup,
            imgUrl,
            qrCode: qrCodeData,
            schoolId
        });

        res.redirect('/students');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student: ' + err.message);
    }
};
