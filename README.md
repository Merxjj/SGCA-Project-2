# EDU-ID SaaS (ID Card + QR Attendance System)

A high-performance, multi-tenant SaaS platform built for schools and universities to manage digital ID cards and track student attendance via QR codes.

🚀 **Live Demo**: [https://sgca-project-2.onrender.com](https://sgca-project-2.onrender.com)  

---

## ⚡ Quick Start (For Evaluators)
To run this project locally in **under 2 minutes**:
1.  **Extract** the ZIP and open terminal in the folder.
2.  **Install**: `npm install`
3.  **Config**: Rename `.env.example` to `.env`.
4.  **Seed**: `node seed.js` (This populates the DB with dummy schools and users).
5.  **Run**: `node server.js`
6.  **Login**: Use `superadmin@saas.com` / `password123` at `http://localhost:3000/login`.

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Frontend**: EJS (Templating), Vanilla CSS, JavaScript
- **Security**: BcryptJS (Password Hashing), Express-Session (RBAC)
- **Utilities**: Multer (Image Uploads), QRCode (Code Generation)

---

## 📋 Features
- **Multi-Tenant Architecture**: Complete data isolation between different schools.
- **Unified Login**: A single, sleek portal for all roles (Super Admin, School Admin, Student).
- **Dynamic QR Generation**: Automatic QR code creation during student enrollment.
- **Attendance System**: Entry/Exit tracking with duplicate scan prevention.
- **Premium UI**: Modern dashboard design with glassmorphism and responsive layouts.

---

## 🔄 System Workflow
1. **School Registration**: Super Admin initializes a school entity.
2. **Admin Setup**: The School Admin creates teacher and student accounts.
3. **Student Deployment**:
   - The system generates a digital ID card for every student.
   - Includes a unique QR code linked to the student's Roll ID.
4. **Digital ID Access**: Students log in via their institutional email to view their dynamic ID card.
5. **Scanning & Logs**: The campus entry point scans the student's QR to mark time-stamped Entry/Exit logs.

---

## 🔑 Test Credentials
| Account Type | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `superadmin@saas.com` | `password123` |
| **School Admin** | `admin@globaledu.com` | `password123` |
| **Student** | `student@globaledu.com` | `password123` |

---

## 🚀 Local Installation
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with `MONGO_URI` and `SESSION_SECRET`.
4. Run `node seed.js` to populate initial data.
5. Run `node server.js` to start the app at `localhost:3000`.

---

## 📌 API / Route Details
- `/login`: Unified Authentication Portal
- `/schools`: (Super Admin) Manage institutional licenses
- `/users`: (Admin) Multi-role user management
- `/students`: (Admin/Teacher) Student enrollment and ID management
- `/profile`: (Student) Personal Digital ID view
- `/attendance`: (Security) Scan portal and daily logs

---

**Developed by Meraj Alam for SGCA Technical Assessment.**
