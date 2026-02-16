const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for sorting by order
carouselSchema.index({ order: 1 });

module.exports = mongoose.model('Carousel', carouselSchema);
