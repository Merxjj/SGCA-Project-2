const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

exports.renderLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Set session data
        req.session.userId = user._id;
        req.session.role = user.role;
        req.session.schoolId = user.schoolId;
        req.session.userName = user.name;

        // Redirect based on role
        if (user.role === 'super_admin') {
            return res.redirect('/schools');
        } else if (user.role === 'school_admin' || user.role === 'teacher') {
            return res.redirect('/students');
        } else if (user.role === 'student') {
            return res.redirect('/profile');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.renderSignup = (req, res) => {
    res.render('signup');
};

exports.signup = async (req, res) => {
    try {
        const { schoolName, contactEmail, address, adminName, password } = req.body;
        
        // 1. Create the School
        const School = require('../models/School');
        const newSchool = await School.create({
            name: schoolName,
            contactEmail: contactEmail,
            address: address
        });

        // 2. Create the Admin User for that school
        await User.create({
            name: adminName,
            email: contactEmail,
            password: password,
            role: 'school_admin',
            schoolId: newSchool._id
        });

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Registration failed: ' + err.message);
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

exports.getProfile = async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    try {
        const user = await User.findById(req.session.userId);
        // Find the student record associated with this email
        const student = await Student.findOne({ rollNo: user.email.split('@')[0] }) || await Student.findOne({ name: user.name });
        
        res.render('profile', { user, student });
    } catch (err) {
        res.status(500).send('Error loading profile');
    }
};
