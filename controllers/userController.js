const User = require('../models/User');
const School = require('../models/School');

// List all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('schoolId').sort({ createdAt: -1 });
        const schools = await School.find().sort({ name: 1 });
        res.render('users', { users, schools });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server Error');
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role, schoolId } = req.body;
        
        // Logical check: If not super_admin, schoolId is mandatory
        if (role !== 'super_admin' && !schoolId) {
            return res.status(400).send('Non-admin users must be assigned to a school.');
        }

        const newUser = new User({
            name,
            email,
            password,
            role,
            schoolId: role === 'super_admin' ? undefined : schoolId
        });

        await newUser.save();
        res.redirect('/users');
    } catch (err) {
        console.error('Error creating user:', err);
        if (err.code === 11000) {
            return res.status(400).send('Email already registered.');
        }
        res.status(500).send('Server Error: ' + err.message);
    }
};

// Delete user (added for full CRUD preference)
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
};
