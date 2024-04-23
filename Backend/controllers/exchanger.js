const Exchanger = require('../models/Exchanger');
const User = require('../models/User')
const {getExchangerSummary} = require('../utils/functions')


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
        next({ message: 'Internal server error'});
    }
};


exports.getExchangeStat = async (req, res) => {
    const today = new Date();
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    try {
        const result = await Exchanger.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfPreviousMonth }
                }
            },
            {
                $facet: {
                    totalExchangers: [
                        { $count: 'total' }
                    ],
                    totalVerified: [
                        { $match: { verified: true } },
                        { $count: 'total' }
                    ],
                    totalActive: [
                        { $match: { isActive: true } },
                        { $count: 'total' }
                    ],
                    dailyStatsPreviousMonth: [
                        {
                            $match: {
                                createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    day: { $dayOfMonth: "$createdAt" },
                                    month: { $month: "$createdAt" },
                                    year: { $year: "$createdAt" }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
                    ],
                    dailyStatsCurrentMonth: [
                        {
                            $match: {
                                createdAt: { $gte: startOfCurrentMonth }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    day: { $dayOfMonth: "$createdAt" },
                                    month: { $month: "$createdAt" },
                                    year: { $year: "$createdAt" }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
                    ],
                    currentMonthStats: [
                        { $match: { createdAt: { $gte: startOfCurrentMonth } } },
                        { $count: 'total' }
                    ],
                    previousMonthStats: [
                        { $match: { createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
                        { $count: 'total' }
                    ]
                }
            }
        ]);

        const currentMonthCount = result[0].currentMonthStats[0] ? result[0].currentMonthStats[0].total : 0;
        const previousMonthCount = result[0].previousMonthStats[0] ? result[0].previousMonthStats[0].total : 0;
        const status = currentMonthCount > previousMonthCount ? 'increase' : 'decrease';

        const response = [
            {
                title: 'Total Exchangers',
                total: result[0].totalExchangers[0] ? result[0].totalExchangers[0].total : 0,
                stat: {
                    currentMonth: result[0].dailyStatsCurrentMonth,
                    previousMonth: result[0].dailyStatsPreviousMonth
                },
                status: status
            },
            {
                title: 'Verified',
                total: result[0].totalVerified[0] ? result[0].totalVerified[0].total : 0,
                stat: {
                    currentMonth: result[0].dailyStatsCurrentMonth,
                    previousMonth: result[0].dailyStatsPreviousMonth
                },
                status: status
            },
            {
                title: 'Active now',
                total: result[0].totalActive[0] ? result[0].totalActive[0].total : 0,
                stat: {
                    currentMonth: result[0].dailyStatsCurrentMonth,
                    previousMonth: result[0].dailyStatsPreviousMonth
                },
                status: status
            }
        ];

        res.json(response);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: error.message });
    }
};



exports.getExchangers = async (req, res, next) => {
    try {
        const exchangers = await Exchanger.find()
        .populate({
            path: 'user',
            populate: {
                path: 'referrals',
                model: 'Referral',
                populate: {
                    path: 'referred',
                    model: 'User'
                }
            }
        });
        res.status(200).json(exchangers);
    } catch (error) {
        next({ message: 'Internal server error' })
    }
};


exports.getUserExchanger = async (req, res, next) => {
    try {
        const user = await User.findOne({userName:req.params.userName})
        if(!user){
            return next({ message: 'User does not exist'});
        }
        const exchanger = await Exchanger.findOne({user:user._id})
            .populate({
                path: 'user',
                populate: {
                    path: 'referrals',
                    model: 'Referral',
                    populate: {
                        path: 'referred',
                        model: 'User'
                    }
                }
            });

        if (!exchanger) {
            return next({ message: 'Exchanger not found', statusCode: 404 });
        }
        res.status(200).json(exchanger);
    } catch (error) {
        console.error('Error fetching exchanger:', error);
        next({ message: 'Internal server error', statusCode: 500 });
    }
};


exports.getExchanger = async (req, res, next) => {
    try {
        const exchanger = await Exchanger.findById(req.params.id)
            .populate({
                path: 'user',
                populate: {
                    path: 'referrals',
                    model: 'Referral',
                    populate: {
                        path: 'referred',
                        model: 'User'
                    }
                }
            });

        if (!exchanger) {
            return next({ message: 'Exchanger not found', statusCode: 404 });
        }
        res.status(200).json(exchanger);
    } catch (error) {
        console.error('Error fetching exchanger:', error);
        next({ message: 'Internal server error', statusCode: 500 });
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
