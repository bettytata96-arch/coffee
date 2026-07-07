const {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} = require('../models/orderModel');

// POST /api/orders (any logged-in user)
function placeOrder(req, res) {
    try {
        const { paymentMethod, items } = req.body;
        const userId = req.user.id;

        if (!paymentMethod || !['Cash', 'Card'].includes(paymentMethod)) {
            return res.status(400).json({ error: 'Valid payment method (Cash or Card) is required' });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order must include at least one item' });
        }
        for (const item of items) {
            if (!item.menuItemId || !item.quantity || item.quantity < 1) {
                return res.status(400).json({ error: 'Each item needs a valid menuItemId and quantity' });
            }
        }

        const { orderId, totalPrice } = createOrder({ userId, paymentMethod, items });

        res.status(201).json({
            message: 'Order placed successfully',
            order: getOrderById(orderId)
        });
    } catch (err) {
        console.error('Place order error:', err);
        res.status(400).json({ error: err.message || 'Failed to place order' });
    }
}

// GET /api/orders/mine (logged-in user's own orders)
function getMyOrders(req, res) {
    const orders = getOrdersByUser(req.user.id);
    res.json(orders);
}

// GET /api/orders (admin only, all orders)
function getAllOrdersHandler(req, res) {
    const orders = getAllOrders();
    res.json(orders);
}

// GET /api/orders/:id (owner or admin)
function getOrder(req, res) {
    const order = getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
        return res.status(403).json({ error: 'You do not have permission to view this order' });
    }
    res.json(order);
}

// PATCH /api/orders/:id/status (admin only)
function changeOrderStatus(req, res) {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const order = getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    updateOrderStatus(req.params.id, status);
    res.json({ message: 'Order status updated', order: getOrderById(req.params.id) });
}

module.exports = { placeOrder, getMyOrders, getAllOrdersHandler, getOrder, changeOrderStatus };