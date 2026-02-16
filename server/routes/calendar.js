const express = require('express');
const router = express.Router();
const CalendarSubmission = require('../models/CalendarSubmission');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/calendar
// @desc    Submit calendar event
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const submissionData = {
            name: req.body.name,
            email: req.body.email,
            eventTitle: req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate: req.body.eventDate,
            phone: req.body.phone || '',
            location: req.body.location || '',
            image: req.file ? req.file.path : ''
        };

        const submission = await CalendarSubmission.create(submissionData);
        res.status(201).json({ success: true, data: submission, message: 'Event submitted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   GET /api/calendar
// @desc    Get all calendar submissions
// @access  Private (Admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const submissions = await CalendarSubmission.find().sort({ createdAt: -1 });
        res.json({ success: true, data: submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/calendar/:id/approve
// @desc    Approve submission and create event
// @access  Private (Admin only)
router.put('/:id/approve', authMiddleware, async (req, res) => {
    try {
        const submission = await CalendarSubmission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }

        // Create event from submission
        const event = await Event.create({
            title: submission.eventTitle,
            description: submission.eventDetails,
            date: submission.eventDate,
            time: req.body.time || '12:00 PM',
            location: submission.location,
            phone: submission.phone,
            image: submission.image,
            thumnail: submission.image,
            link: req.body.link || '',
            approved: true
        });

        // Update submission status
        submission.approved = true;
        submission.status = 'approved';
        await submission.save();

        res.json({ success: true, data: event, message: 'Event approved and published' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/calendar/:id
// @desc    Delete submission
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const submission = await CalendarSubmission.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }
        res.json({ success: true, message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
