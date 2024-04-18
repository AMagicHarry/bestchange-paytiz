const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: { 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    country: { 
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin'], 
    },
    totalEarnings: {
        type: Number,
        default: 0,
        required: true
    },
    totalWithdrawal: {
        type: Number,
        default: 0,
        required: true
    },
    availableForWithdrawal: {
        type: Number,
        default: 0,
        required: true
    },
    referrals: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
