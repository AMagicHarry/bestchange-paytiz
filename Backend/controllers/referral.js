const Referral = require('../models/Referral');

exports.createReferral = async (req, res, next) => {
    const { referrer, referred } = req.body;
    if (!referrer || !referred) {
        return res.status(400).json({ message: 'Both referrer and referred users are required' });
    }

    try {
        const newReferral = new Referral({ referrer, referred });
        await newReferral.save();
        res.status(201).json(newReferral);
    } catch (error) {
        next({ message: 'Internal server error', error: error.message });
    }
};


exports.getReferrals = async (req, res, next) => {
    const { referrer, referred } = req.body;
    try {
        const referrals = await Referral.find({
            referred,referrer
        }).populate('referrer referred');
        res.status(200).json(referrals);
    } catch (error) {
        next({ message: 'Internal server error', error: error.message });
    }
};

exports.getReferral = async (req, res, next) => {
    try {
        const referral = await Referral.findById(req.params.id).populate('referrer referred');
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.status(200).json(referral);
    } catch (error) {
        next({ message: 'Internal server error', error: error.message });
    }
};

exports.updateReferral = async (req, res, next) => {
    try {
        const referral = await Referral.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('referrer referred');
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.status(200).json(referral);
    } catch (error) {
        next({ message: 'Internal server error', error: error.message });
    }
};

exports.deleteReferral = async (req, res, next) => {
    try {
        const referral = await Referral.findByIdAndDelete(req.params.id);
        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.status(200).json({ message: 'Referral deleted successfully' });
    } catch (error) {
        next({ message: 'Internal server error', error: error.message });
    }
};
