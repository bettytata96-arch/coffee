const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getAllOrdersHandler,
    getOrder,
    changeOrderStatus
} = require('../controllers/orderController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// All order routes require login
router.use(requireAuth);

router.post('/', placeOrder);
router.get('/mine', getMyOrders);
router.get('/', requireRole('admin'), getAllOrdersHandler);
router.get('/:id', getOrder);
router.patch('/:id/status', requireRole('admin'), changeOrderStatus);

module.exports = router;