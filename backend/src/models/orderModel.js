const db = require('../config/db');

// Creates an order + its order_items in a single transaction (all-or-nothing)
const createOrder = db.transaction(({ userId, paymentMethod, items }) => {
    // items = [{ menuItemId, quantity }]

    let totalPrice = 0;
    const itemDetails = [];

    // Look up each menu item's real price from the DB (never trust frontend prices)
    for (const item of items) {
        const menuItem = db.prepare('SELECT * FROM menu_items WHERE id = ? AND is_available = 1').get(item.menuItemId);
        if (!menuItem) {
            throw new Error(`Menu item with id ${item.menuItemId} not found or unavailable`);
        }
        const lineTotal = menuItem.price * item.quantity;
        totalPrice += lineTotal;
        itemDetails.push({
            menuItemId: menuItem.id,
            quantity: item.quantity,
            unitPrice: menuItem.price
        });
    }

    const orderStmt = db.prepare(`
        INSERT INTO orders (user_id, payment_method, status, total_price)
        VALUES (?, ?, 'pending', ?)
    `);
    const orderResult = orderStmt.run(userId, paymentMethod, totalPrice);
    const orderId = orderResult.lastInsertRowid;

    const itemStmt = db.prepare(`
        INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price)
        VALUES (?, ?, ?, ?)
    `);
    for (const item of itemDetails) {
        itemStmt.run(orderId, item.menuItemId, item.quantity, item.unitPrice);
    }

    return { orderId, totalPrice };
});

function getOrdersByUser(userId) {
    const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    return orders.map(order => attachItems(order));
}

function getAllOrders() {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    return orders.map(order => attachItems(order));
}

function getOrderById(id) {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!order) return null;
    return attachItems(order);
}

function updateOrderStatus(id, status) {
    const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    return result.changes;
}

// Helper: attach line items + coffee names to an order
function attachItems(order) {
    const items = db.prepare(`
        SELECT oi.quantity, oi.unit_price, mi.name, mi.id as menu_item_id
        FROM order_items oi
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        WHERE oi.order_id = ?
    `).all(order.id);
    return { ...order, items };
}

module.exports = { createOrder, getOrdersByUser, getAllOrders, getOrderById, updateOrderStatus };