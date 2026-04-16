const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    bloodGroup: { type: String },
    imgUrl: { type: String }, // Path to the uploaded photo
    qrCode: { type: String }, // To be generated in Task 7
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
});

module.exports = mongoose.model('Student', StudentSchema);
