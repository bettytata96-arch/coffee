const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // logs every request to the console

// Health check route (just to confirm server is alive)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Coffee shop API is running' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menu', menuRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
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