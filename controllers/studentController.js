const Student = require('../models/Student');
const School = require('../models/School');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('schoolId').sort({ createdAt: -1 });
        const schools = await School.find();
        res.render('students', { students, schools });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createStudent = async (req, res, next) => {
    try {
        const { name, rollNo, className, bloodGroup, schoolId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Create initial student record
        const student = new Student({
            name,
            rollNo,
            class: className,
            bloodGroup,
            image,
            schoolId
        });

        // Task 7: QR Code Generation
        // We link the QR code to the Student's unique MongoDB ID
        const qrData = student._id.toString();
        const qrImageName = `qr-${student.rollNo}-${Date.now()}.png`;
        const qrPath = path.join(__dirname, '../public/uploads/', qrImageName);
        
        await QRCode.toFile(qrPath, qrData);
        student.qrCode = `/uploads/${qrImageName}`;

        await student.save();
        res.redirect('/students');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating student');
    }
};
