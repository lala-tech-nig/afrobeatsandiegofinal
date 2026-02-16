const mongoose = require('mongoose');

const calendarSubmissionSchema = new mongoose.Schema({
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
    eventTitle: {
        type: String,
        required: true
    },
    eventDetails: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    approved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CalendarSubmission', calendarSubmissionSchema);
