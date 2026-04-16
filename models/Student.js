const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    image: { type: String }, // Path to uploaded image
    qrCode: { type: String }, // To be generated in Task 7
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
