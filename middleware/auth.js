// Function to check if user is logged in
exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// Function to restrict access based on roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.role)) {
            return res.status(403).send('Access Denied: You do not have permission to view this page.');
        }
        next();
    };
};
