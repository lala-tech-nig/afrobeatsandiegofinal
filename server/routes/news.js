const express = require('express');
const router = express.Router();
const News = require('../models/News');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/news
// @desc    Get all news posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/news/:id
// @desc    Get single news post
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/news
// @desc    Create news post
// @access  Private (Admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const news = await News.create(req.body);
        res.status(201).json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/news/:id
// @desc    Update news post
// @access  Private (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/news/:id
// @desc    Delete news post
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.json({ success: true, message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
