const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all approved events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({ approved: true }).sort({ date: 1 });
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private (Admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.json({ success: true, message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
