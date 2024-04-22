const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExchangerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
     currency: { 
        name: { type: String, required: true },  
        code: { type: String, required: true }, 
        symbol: { type: String, required: false}
    },
    avatar: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5, 
    },
    rateRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    siteOn: {
        type: Boolean,
        required: true,
        default: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    verified: {
        type: Boolean,
        required: true,
    },
    legalRegistration: { 
        type: Boolean,
        required: true
    },
    reviews: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Review',
           required:false,
       }],
},{
    timestamps:true
});

module.exports = mongoose.model('Exchanger', ExchangerSchema);
