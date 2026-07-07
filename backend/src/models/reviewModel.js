const db = require('../config/db');

function createReview({ userId, rating, comment }) {
    const stmt = db.prepare(`
        INSERT INTO reviews (user_id, rating, comment)
        VALUES (?, ?, ?)
    `);
    const result = stmt.run(userId, rating, comment);
    return result.lastInsertRowid;
}

function getAllReviews() {
    return db.prepare(`
        SELECT reviews.id, reviews.rating, reviews.comment, reviews.created_at, users.name as author
        FROM reviews
        JOIN users ON reviews.user_id = users.id
        ORDER BY reviews.created_at DESC
    `).all();
}

function getReviewById(id) {
    return db.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
}

function deleteReview(id) {
    const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
    const result = stmt.run(id);
    return result.changes;
}

module.exports = { createReview, getAllReviews, getReviewById, deleteReview };