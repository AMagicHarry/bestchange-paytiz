const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReferralSchema = new Schema({
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    referred: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Referral', ReferralSchema);
