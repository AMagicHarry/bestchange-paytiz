const router = require('express').Router();
const { getReviews, getReview, deleteReview, updateReview,getExchangerReviews, addReview } = require('../controllers/review.js');
// const { protect } = require('../middleware/protect.js');

// router.use(protect);

router.route('/')
    .get(getReviews)
    .post(addReview);


router.route('/:id')
    .get(getReview)
    .delete(deleteReview)
    .put(updateReview);

module.exports = router;
