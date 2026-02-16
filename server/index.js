const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note: Local uploads folder removed - using Cloudinary for all images

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/calendar', require('./routes/calendar'));
app.use('/api/news', require('./routes/news'));
app.use('/api/shop', require('./routes/shop'));
app.use('/api/connect', require('./routes/connect'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/carousel', require('./routes/carousel'));
app.use('/api/forms', require('./routes/forms'));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Afrobeats San Diego API',
        version: '1.0.0',
        endpoints: {
            events: '/api/events',
            calendar: '/api/calendar',
            news: '/api/news',
            shop: '/api/shop',
            connect: '/api/connect',
            auth: '/api/auth',
            upload: '/api/upload',
            carousel: '/api/carousel'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
