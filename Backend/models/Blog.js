const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true 
    },
    avatar: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', BlogSchema);
