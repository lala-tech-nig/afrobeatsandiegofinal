const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    thumnail: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    approved: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
