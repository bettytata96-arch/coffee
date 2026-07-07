const { createReview, getAllReviews, getReviewById, deleteReview } = require('../models/reviewModel');

// GET /api/reviews (public)
function listReviews(req, res) {
    res.json(getAllReviews());
}

// POST /api/reviews (logged-in users only)
function addReview(req, res) {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    if (!comment || comment.trim().length === 0) {
        return res.status(400).json({ error: 'Comment is required' });
    }

    const id = createReview({ userId: req.user.id, rating, comment: comment.trim() });
    res.status(201).json({ message: 'Review submitted', id });
}

// DELETE /api/reviews/:id (owner or admin)
function removeReview(req, res) {
    const review = getReviewById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (req.user.role !== 'admin' && review.user_id !== req.user.id) {
        return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    deleteReview(req.params.id);
    res.json({ message: 'Review deleted' });
}

module.exports = { listReviews, addReview, removeReview };