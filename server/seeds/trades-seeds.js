const Trade = require('../models/Trade');

const tradesData = [
    {
        date: '2023-03-04',
        profit: 50892,
        prem: 2.25,
        trades: 2, 
        user_id: 1
    },
    {
        date: '2023-03-05',
        profit: 41077,
        prem: 2.50,
        trades: 3, 
        user_id: 2
    },
]

const seedTrades = () => Trade.bulkCreate(tradesData);

module.exports = seedTrades;