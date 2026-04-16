const mongoose = require('mongoose');
const School = require('./models/School');
const User = require('./models/User');
const Student = require('./models/Student');
const QRCode = require('qrcode');

const URI = "mongodb+srv://admin:SgcaProject%402026@cluster0.6othlhs.mongodb.net/?appName=Cluster0";

const seedLive = async () => {
    try {
        await mongoose.connect(URI);
        console.log('🌍 Connected to Live Atlas DB...');

        // Clear existing to avoid duplicates in this specific demo school
        await User.deleteMany({ email: /@globaltech.edu/ });
        await Student.deleteMany({});
        await School.deleteMany({ name: "Global Tech University" });

        // 1. Create Demo School
        const school = await School.create({
            name: "Global Tech University",
            address: "Innovation Blvd, Cyber City",
            contactEmail: "admin@globaltech.edu",
            planType: "enterprise"
        });

        // 2. Create Users for EVERY role
        const demoUsers = [
            { name: "SaaS Owner", email: "superadmin@saas.com", password: "password123", role: "super_admin" },
            { name: "Uni Admin", email: "admin@globaltech.edu", password: "password123", role: "school_admin", schoolId: school._id },
            { name: "Professor X", email: "teacher@globaltech.edu", password: "password123", role: "teacher", schoolId: school._id },
            { name: "John Doe (Student)", email: "student@globaltech.edu", password: "password123", role: "student", schoolId: school._id },
            { name: "Officer Bob", email: "guard@globaltech.edu", password: "password123", role: "security_guard", schoolId: school._id }
        ];

        for (const u of demoUsers) {
            // Check if superadmin already exists globally
            if (u.role === 'super_admin') {
               const exists = await User.findOne({ email: u.email });
               if (exists) continue;
            }
            await User.create(u);
        }

        // 3. Create 5 Dummy Students
        const dummyStudents = [
            { name: "John Doe", rollNo: "GT-101", class: "Computer Science" },
            { name: "Jane Smith", rollNo: "GT-102", class: "Information Technology" },
            { name: "Mike Johnson", rollNo: "GT-103", class: "Mechanical Eng." }
        ];

        for (const data of dummyStudents) {
            const qrCode = await QRCode.toDataURL(data.rollNo);
            await Student.create({
                ...data,
                bloodGroup: "O+",
                imgUrl: "https://ui-avatars.com/api/?name=" + data.name.replace(' ', '+'),
                qrCode: qrCode,
                schoolId: school._id
            });
        }

        console.log('✅ Full-Role Live Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedLive();
