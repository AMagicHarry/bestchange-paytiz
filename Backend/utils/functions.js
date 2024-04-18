const getExchangerSummary = async (days, metric,model) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    let matchStage = {
        createdAt: { $gte: startDate, $lte: endDate }
    };

    const totalResults = await model.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
        { $count: 'total' }
    ]);
    const totalExchangers = totalResults.length > 0 ? totalResults[0].total : 0;

    if (metric === 'totalVerified') {
        matchStage.verified = true;
    } else if (metric === 'totalActive') {
        matchStage.isActive = true;
    }

    const matchedResults = await model.aggregate([
        { $match: matchStage },
        { $count: 'total' }
    ]);
    const matchedTotal = matchedResults.length > 0 ? matchedResults[0].total : 0;

    let percentage = totalExchangers > 0 ? (matchedTotal / totalExchangers * 100).toFixed(2) : 0;

    return {
        total: matchedTotal,
        percentage: parseFloat(percentage)  
    };
}
