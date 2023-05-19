const router = require('express').Router();
const Trade = require('../models/Trade');
const convertToDate = require('../utils/dateSorter')
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    // console.log(req.session.user_id)
    Trade.findAll({
      where: {
        user_id: 1
      }
    })
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

router.get('/profit', (req, res) => {
  Trade.findAll({
    where: {
      user_id: 1
    }
  })
  .then(data => {
      const sortedData = data.sort((a,b) => {
        return b.profit - a.profit
      });
      const firstFive = sortedData.slice(0, 5);
      res.json(firstFive)
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

router.get('/trades', (req, res) => {
  Trade.findAll({
    where: {
      user_id: 1
    }
  })
  .then(data => {
      const sortedData = data.sort((a,b) => {
        return b.trades - a.trades
      });
      const firstFive = sortedData.slice(0, 5);
      res.json(firstFive)
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

router.get('/prem', (req, res) => {
  Trade.findAll({
    where: {
      user_id: 1
    }
  })
  .then(data => {
      const sortedData = data.sort((a,b) => {
        return b.prem - a.prem
      });
      const firstFive = sortedData.slice(0, 5);
      res.json(firstFive)
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

router.post('/', (req, res) => {
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