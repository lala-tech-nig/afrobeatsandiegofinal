const express = require('express');
const router = express.Router();
const ShopItem = require('../models/ShopItem');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/shop
// @desc    Get all shop items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const items = await ShopItem.find({ inStock: true }).sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/shop/:id
// @desc    Get single shop item
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const item = await ShopItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/shop
// @desc    Create shop item
// @access  Private (Admin only)
router.post('/', authMiddleware, async (req, res) => {
    console.log('POST /api/shop receive:', req.body);
    try {
        const { title, description, price, image, purchaseLink, category, inStock } = req.body;

        // Explicitly construct object to avoid prototype issues
        const newItemData = {
            title,
            description,
            price,
            image,
            purchaseLink,
            category: category || 'merchandise',
            inStock: inStock !== undefined ? inStock : true
        };

        const item = await ShopItem.create(newItemData);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.error("Shop create error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/shop/:id
// @desc    Update shop item
// @access  Private (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await ShopItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/shop/:id
// @desc    Delete shop item
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await ShopItem.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.json({ success: true, message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
