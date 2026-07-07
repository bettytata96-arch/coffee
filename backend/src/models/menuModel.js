const db = require('../config/db');

function getAllMenuItems() {
    return db.prepare('SELECT * FROM menu_items WHERE is_available = 1').all();
}

function getMenuItemById(id) {
    return db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
}

function createMenuItem({ name, description, price, imageUrl }) {
    const stmt = db.prepare(`
        INSERT INTO menu_items (name, description, price, image_url)
        VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, description, price, imageUrl);
    return result.lastInsertRowid;
}

function updateMenuItem(id, { name, description, price, imageUrl, isAvailable }) {
    const stmt = db.prepare(`
        UPDATE menu_items
        SET name = ?, description = ?, price = ?, image_url = ?, is_available = ?
        WHERE id = ?
    `);
    const result = stmt.run(name, description, price, imageUrl, isAvailable ? 1 : 0, id);
    return result.changes; // number of rows updated
}

function deleteMenuItem(id) {
    const stmt = db.prepare('DELETE FROM menu_items WHERE id = ?');
    const result = stmt.run(id);
    return result.changes;
}

module.exports = { getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };