const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    address: { 
        type: String, 
        required: true 
    },
    contactEmail: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true
    },
    subscriptionStatus: { 
        type: String, 
        enum: ['active', 'expired'], 
        default: 'active' 
    },
    planType: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        default: 'basic'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('School', SchoolSchema);
