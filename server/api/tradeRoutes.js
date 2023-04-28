const express = require('express');
const Trade = require('../models/Trade');
const convertToDate = require('../utils/dateSorter')

const router = express();

router.get('/trades', (req, res) => {
    Trade.findAll()
    .then(data => {
        res.json(data.sort((a,b) => {
          return convertToDate(a.date) - convertToDate(b.date)
        }));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/trades', (req, res) => {
    Trade.create({
      date: req.body.date,
      profit: req.body.profit,
      prem: req.body.prem,
      trades: req.body.trades,
    })
    .then(() => {
      res.json("New Record Entered Succesfully!")
    });
  });

module.exports = router;