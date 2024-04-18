const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExchangerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        min: 1, 
        max: 5, 
    },
    exchangeRate: {
        type: Number, 
        required: true
    },
    rateRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    siteOn: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    verified: {
        type: Boolean,
        required: false,
    },
    legalRegistration: { 
        type: Boolean,
        required: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Exchanger', ExchangerSchema);
