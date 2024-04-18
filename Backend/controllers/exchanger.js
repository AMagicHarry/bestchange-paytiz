const Exchanger = require('../models/Exchanger');
const getExchangerSummary = require('../utils/functions')


exports.createExchanger = async (req, res, next) => {
    const { user, avatar, name, exchangeRate, rateRange, siteOn, isActive } = req.body;
    if (!user || !avatar || !name || exchangeRate === undefined || !rateRange || rateRange.min === undefined || rateRange.max === undefined || siteOn === undefined || isActive === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newExchanger = new Exchanger(req.body);
        await newExchanger.save();
        res.status(201).json(newExchanger);
    } catch (error) {
        next({ message: 'Internal server error', error });
    }
};


exports.getExchangeStat = async (req, res, next) => {
    try {
        const days = parseInt(req.params.days);
        const metric = req.params.metric;
        
        const totalExchangers = await getExchangerSummary(days, metric,Exchanger);
        const totalVerified = await getExchangerSummary(days, metric,Exchanger);
        const totalActive = await getExchangerSummary(days, metric,Exchanger);

        return res.status(200).json({totalExchangers,totalVerified,totalActive})
    } catch (error) {
        next({ message: 'Internal server error', error });
    }
};



exports.getExchangers = async (req, res, next) => {
    try {
        const exchangers = await Exchanger.find().populate('user');
        res.status(200).json(exchangers);
    } catch (error) {
        next({ message: 'Internal server error' })
    }
};


exports.getExchanger = async (req, res, next) => {
    try {
        const exchanger = await Exchanger.findById(req.params.id).populate('user');
        if (!exchanger) {
            next({ message: 'Internal server error' })
        }
        res.status(200).json(exchanger);
    } catch (error) {
        next({ message: 'Internal server error' })
    }
};


exports.updateExchanger = async (req, res, next) => {
    try {
        const exchanger = await Exchanger.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!exchanger) {
            next({ message: 'Internal server error' })
        }
        res.status(200).json(exchanger);
    } catch (error) {
        next({ message: 'Internal server error' })
    }
};


exports.deleteExchanger = async (req, res, next) => {
    try {
        const exchanger = await Exchanger.findByIdAndDelete(req.params.id);
        if (!exchanger) {
            next({ message: 'Internal server error' })
        }
        res.status(200).json(exchanger);
    } catch (error) {
        next({ message: 'Internal server error' })
    }
};
