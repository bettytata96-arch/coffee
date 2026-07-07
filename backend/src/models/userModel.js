const db = require('../config/db');

// Create a new user
function createUser({ name, email, passwordHash, role = 'customer' }) {
    const stmt = db.prepare(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, email, passwordHash, role);
    return result.lastInsertRowid;
}

function findUserByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
}

function findUserById(id) {
    const stmt = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?');
    return stmt.get(id);
}

module.exports = { createUser, findUserByEmail, findUserById };