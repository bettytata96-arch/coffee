const express = require('express');
const router = express.Router();
const { listMenu, getMenuItem, addMenuItem, editMenuItem, removeMenuItem } = require('../controllers/menuController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// Public routes
router.get('/', listMenu);
router.get('/:id', getMenuItem);

// Admin-only routes
router.post('/', requireAuth, requireRole('admin'), addMenuItem);
router.put('/:id', requireAuth, requireRole('admin'), editMenuItem);
router.delete('/:id', requireAuth, requireRole('admin'), removeMenuItem);

module.exports = router;