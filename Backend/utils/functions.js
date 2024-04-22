exports.getExchangerSummary = async (days, metric, model, previousTotal) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    let dailyData = [];

    for (let i = 0; i <= days; i++) {
        let dayStart = new Date(startDate);
        dayStart.setDate(startDate.getDate() + i);
        let dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);

        let matchStage = {
            createdAt: { $gte: dayStart, $lte: dayEnd }
        };

        if (metric === 'totalVerified') {
            matchStage.verified = true;
        } else if (metric === 'totalActive') {
            matchStage.isActive = true;
        }

        const dailyResult = await model.aggregate([
            { $match: matchStage },
            { $count: 'total' }
        ]);

        const dailyTotal = dailyResult.length > 0 ? dailyResult[0].total : 0;
        dailyData.push(dailyTotal);
    }

    let percentageChanges = [];

    for (let i = 1; i < dailyData.length; i++) {
        let previousDayTotal = dailyData[i - 1];
        let currentDayTotal = dailyData[i];
        let dailyChange = currentDayTotal - previousDayTotal;
        let percentageChange = previousDayTotal > 0 ? (dailyChange / previousDayTotal) * 100 : 0;
        percentageChanges.push(percentageChange.toFixed(2));
    }

    let overallChange = dailyData[dailyData.length - 1] - dailyData[0];
    let isOverallIncrease = overallChange > 0;

    return {
        percentageChanges: percentageChanges,
        total: dailyData[dailyData.length - 1],
        status: isOverallIncrease
    };
};
