const express = require('express');
const router = express.Router();
const { listReviews, addReview, removeReview } = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', listReviews); // public
router.post('/', requireAuth, addReview); // any logged-in user
router.delete('/:id', requireAuth, removeReview); // owner or admin

module.exports = router;