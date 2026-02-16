const express = require('express');
const router = express.Router();
const ConnectSubmission = require('../models/ConnectSubmission');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/connect
// @desc    Submit connect form
// @access  Public
router.post('/', async (req, res) => {
    try {
        const submission = await ConnectSubmission.create(req.body);
        res.status(201).json({ success: true, data: submission, message: 'Form submitted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   GET /api/connect
// @desc    Get all connect submissions
// @access  Private (Admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const submissions = await ConnectSubmission.find().sort({ createdAt: -1 });
        res.json({ success: true, data: submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/connect/:id
// @desc    Update submission status
// @access  Private (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const submission = await ConnectSubmission.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }
        res.json({ success: true, data: submission });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/connect/:id
// @desc    Delete submission
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const submission = await ConnectSubmission.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }
        res.json({ success: true, message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
