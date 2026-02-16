const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/upload
// @desc    Upload image file
// @access  Private (Admin only)
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        res.json({
            success: true,
            filename: req.file.filename,
            url: req.file.path,
            publicId: req.file.filename,
            message: 'File uploaded successfully to Cloudinary'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
