const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

exports.getAttendanceLogs = async (req, res) => {
    try {
        const logs = await Attendance.find()
            .populate('studentId')
            .populate('schoolId')
            .sort({ timestamp: -1 });
        res.render('attendance', { logs });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.markAttendance = async (req, res) => {
    try {
        const { rollNo, type } = req.body;
        const student = await Student.findOne({ rollNo });

        if (!student) {
            return res.status(404).send('Student not found! Invalid QR data.');
        }

        // Logical Check: Prevent double entry without exit (Task 9)
        const lastLog = await Attendance.findOne({ studentId: student._id }).sort({ timestamp: -1 });
        if (lastLog && lastLog.type === type) {
            return res.status(400).send(`Student already marked as ${type}. Please mark ${type === 'entry' ? 'exit' : 'entry'} first.`);
        }

        await Attendance.create({
            studentId: student._id,
            schoolId: student.schoolId,
            type: type
        });

        res.redirect('/attendance');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error marking attendance');
    }
};
