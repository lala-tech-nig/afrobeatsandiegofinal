const mongoose = require('mongoose');

const connectSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['DJ', 'Rapper', 'Dancer', 'Promoter', 'Others']
    },
    equipment: {
        type: String,
        default: ''
    },
    demo: {
        type: String,
        default: ''
    },
    style: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    rate: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    availability: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['new', 'reviewed', 'contacted'],
        default: 'new'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ConnectSubmission', connectSubmissionSchema);
