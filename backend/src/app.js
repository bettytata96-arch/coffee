const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));
// logs every request to the console
// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// Health check route (just to confirm server is alive)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Coffee shop API is running' });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menu', menuRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);
// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

module.exports = app;