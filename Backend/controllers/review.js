const Review = require('../models/Review');


exports.addReview = async (req, res, next) => {
    const { user, content } = req.body;
    if (!user || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const newReview = new Review({ user, content, rating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        next({ message: 'Internal server error'});
    }
};



exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find().populate('user');
        res.status(200).json(reviews);
    } catch (error) {
        next({ message: 'Internal server error'});
    }
};

exports.getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id).populate('user');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        next({ message: 'Internal server error'});
    }
};


exports.updateReview = async (req, res, next) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        next({ message: 'Internal server error'});
    }
};

exports.deleteReview = async (req, res, next) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        next({ message: 'Internal server error'});
    }
};
