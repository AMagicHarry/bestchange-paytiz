const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true 
    },
    rating: {
        type: Number,
        required: false,
        min: 1, 
        max: 5, 
    },
}, {
    timestamps: true, 
});

module.exports = mongoose.model('Review', ReviewSchema);
