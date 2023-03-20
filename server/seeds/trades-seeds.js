const Trade = require('../models/Trade');

const tradesData = [
    {
        id: 1,
        date: '2023-03-20',
        revenue: 100000,
        profit: 100000,
        prem: 3.00,
        trades: 5
    },
]

const seedTrades = () => Trade.bulkCreate(tradesData);

module.exports = seedTrades;