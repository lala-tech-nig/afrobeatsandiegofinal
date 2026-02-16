const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        let admin = await Admin.findOne({ email: email.toLowerCase() });

        // If admin doesn't exist and credentials match env, create one
        if (!admin && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() && password === process.env.ADMIN_PASSWORD) {
            admin = await Admin.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });
        }

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.post('/verify', authMiddleware, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }
        res.json({ success: true, admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/auth/me
// @desc    Get current admin
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json({ success: true, admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
