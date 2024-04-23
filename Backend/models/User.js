const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    country: { 
        type: String,
        required: true,
        unique: false,
    },
    countryCode: { 
        type: String,
        required: false,
        unique: true,
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
            ref: 'Referral',
            required:false,
        }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
