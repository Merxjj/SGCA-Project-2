const School = require('../models/School');

exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find().sort({ createdAt: -1 });
        res.render('schools', { schools });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createSchool = async (req, res) => {
    try {
        const { name, address, contactEmail, planType } = req.body;
        await School.create({ name, address, contactEmail, planType });
        res.redirect('/schools');
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).send('Email already exists');
        }
        res.status(500).send('Server Error');
    }
};
