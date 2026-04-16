require('dotenv').config();
const mongoose = require('mongoose');
const School = require('./models/School');
const User = require('./models/User');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🌱 Connected to DB for seeding...');

        // Clear existing data
        await School.deleteMany({});
        await User.deleteMany({});

        // 1. Create Schools
        const schools = await School.insertMany([
            { name: "Global International School", address: "Tech Park, Bangalore", contactEmail: "admin@globaledu.com", planType: "enterprise" },
            { name: "Springfield Academy", address: "North Avenue, Mumbai", contactEmail: "admin@springfield.com", planType: "premium" }
        ]);
        console.log('✅ Schools Created');

        // 2. Create Super Admin
        await User.create({
            name: "Super Admin",
            email: "superadmin@saas.com",
            password: "password123",
            role: "super_admin"
        });

        // 3. Create Users for each school
        for (const school of schools) {
            const schoolPrefix = school.name.split(' ')[0].toLowerCase();
            
            await User.create([
                {
                    name: `${school.name} Admin`,
                    email: `admin@${schoolPrefix}.com`,
                    password: "password123",
                    role: "school_admin",
                    schoolId: school._id
                },
                {
                    name: `Teacher ${schoolPrefix.toUpperCase()}`,
                    email: `teacher@${schoolPrefix}.com`,
                    password: "password123",
                    role: "teacher",
                    schoolId: school._id
                },
                {
                    name: `Guard ${schoolPrefix.toUpperCase()}`,
                    email: `guard@${schoolPrefix}.com`,
                    password: "password123",
                    role: "security_guard",
                    schoolId: school._id
                },
                {
                    name: `John Student (${schoolPrefix})`,
                    email: `student@${schoolPrefix}.com`,
                    password: "password123",
                    role: "student",
                    schoolId: school._id
                }
            ]);
        }

        console.log('✅ Dummy Users & Roles Created');
        console.log('-----------------------------------');
        console.log('Credentials (Password for all: password123):');
        console.log('1. superadmin@saas.com');
        console.log('2. admin@globaledu.com');
        console.log('3. guard@globaledu.com');
        console.log('-----------------------------------');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
