const express = require('express');
const router = express.Router();
const BookCall = require('../models/BookCall');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/forms/book-call
// @desc    Submit a "Book a call" form
// @access  Public
router.post('/book-call', async (req, res) => {
    try {
        const { fullName, email, phoneNumber, message } = req.body;

        const newSubmission = await BookCall.create({
            fullName,
            email,
            phoneNumber,
            message
        });

        res.status(201).json({ success: true, data: newSubmission });
    } catch (error) {
        console.error("Book Call Submit Error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   GET /api/forms/book-call
// @desc    Get all "Book a call" submissions
// @access  Private (Admin only)
router.get('/book-call', authMiddleware, async (req, res) => {
    try {
        const submissions = await BookCall.find().sort({ createdAt: -1 });
        res.json({ success: true, data: submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/forms/book-call/:id
// @desc    Delete a submission
// @access  Private (Admin only)
router.delete('/book-call/:id', authMiddleware, async (req, res) => {
    try {
        const submission = await BookCall.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }
        res.json({ success: true, message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
