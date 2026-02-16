const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    purchaseLink: {
        type: String,
        required: false // Made optional to allow items without external links
    },
    category: {
        type: String,
        default: 'merchandise'
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ShopItem', shopItemSchema);
