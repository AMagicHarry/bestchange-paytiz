const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  exchangerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exchanger' },
  totalTraffic: Number,
  totalViews: Number,
  conversionRate: Number,
  dailyTraffic: [{
    date: Date,
    count: Number
  }]
});

const Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;
