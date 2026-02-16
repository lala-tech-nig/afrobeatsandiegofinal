const express = require('express');
const router = express.Router();
const Carousel = require('../models/Carousel');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

// @route   GET /api/carousel
// @desc    Get all active carousel images
// @access  Public
router.get('/', async (req, res) => {
    try {
        const images = await Carousel.find({ active: true }).sort({ order: 1 }).limit(5);
        res.json({ success: true, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/carousel/admin
// @desc    Get all carousel images (including inactive)
// @access  Private (Admin only)
router.get('/admin', authMiddleware, async (req, res) => {
    try {
        const images = await Carousel.find().sort({ order: 1 });
        res.json({ success: true, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/carousel
// @desc    Upload new carousel image
// @access  Private (Admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        // Check if we already have 5 images
        const count = await Carousel.countDocuments();
        if (count >= 5) {
            // Delete uploaded image from Cloudinary since we can't use it
            if (req.file && req.file.filename) {
                await cloudinary.uploader.destroy(req.file.filename);
            }
            return res.status(400).json({
                success: false,
                message: 'Maximum of 5 carousel images allowed. Please delete one before adding a new one.'
            });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Get the next order number
        const maxOrder = await Carousel.findOne().sort({ order: -1 });
        const nextOrder = maxOrder ? maxOrder.order + 1 : 0;

        const carouselImage = await Carousel.create({
            title: req.body.title || 'Carousel Image',
            image: req.file.path,
            publicId: req.file.filename,
            order: nextOrder,
            active: true
        });

        res.status(201).json({ success: true, data: carouselImage });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/carousel/:id
// @desc    Delete carousel image
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const image = await Carousel.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // Delete from database
        await Carousel.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/carousel/:id/order
// @desc    Update carousel image order
// @access  Private (Admin only)
router.put('/:id/order', authMiddleware, async (req, res) => {
    try {
        const { order } = req.body;
        const image = await Carousel.findByIdAndUpdate(
            req.params.id,
            { order },
            { new: true, runValidators: true }
        );

        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        res.json({ success: true, data: image });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/carousel/:id/toggle
// @desc    Toggle active status
// @access  Private (Admin only)
router.put('/:id/toggle', authMiddleware, async (req, res) => {
    try {
        const image = await Carousel.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        image.active = !image.active;
        await image.save();

        res.json({ success: true, data: image });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
