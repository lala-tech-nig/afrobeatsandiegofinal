const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    trending: {
        type: Boolean,
        default: false
    },
    author: {
        type: String,
        default: 'AfroBeat San Diego'
    },
    profileImage: {
        type: String,
        default: '/post.jpeg'
    },
    views: {
        type: String,
        default: '0'
    },
    timeAgo: {
        type: String,
        default: 'Just now'
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
