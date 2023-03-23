const express = require('express');
const Trade = require('../models/Trade');

const router = express();

router.get('/', (req, res) => {
    Trade.findAll({
        attributes: [
            'id',
            'date',
            'revenue',
            'profit',
            'prem',
            'trades'
        ],
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/', (req, res) => {
    Trade.create({
      date: req.body.date,
      revenue: req.body.revenue,
      profit: req.body.profit,
      prem: req.body.prem,
      trades: null,
    })
    .then(() => {
      res.json("New Record Entered Succesfully!")
    });
  });

module.exports = router;